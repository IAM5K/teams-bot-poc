import { TurnContext } from "botbuilder";
import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
var builder = require('botbuilder');
import {
  CloudAdapter ,
  MessageFactory,
  ConversationParameters,
  Channels,
  ConversationReference,
  TeamsInfo,
  TeamsChannelData,
} from "botbuilder";


import { ThisMemoryScope } from "botbuilder-dialogs";

const rawWishCard = require("../adaptiveCards/wish.json");


export class WishCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*wish\s*/];
  }
  async getPagedMembers(context) {
    let continuationToken;
    const members = [];

    do {
        const page = await TeamsInfo.getPagedMembers(
            context,
            100,
            continuationToken
        );

        continuationToken = page.continuationToken;

        members.push(...page.members);
    } while (continuationToken !== undefined);

    return members;
}

  async VmessageAllMembersAsync(context) {
    const members = await this.getPagedMembers(context);
    const messagev = MessageFactory.text(
      `Hello. Im a Teams conversation bot.`
  );

    await context.sendActivity(messagev);

    await Promise.all(members.map(async (member) => {
        const message = MessageFactory.text(
            `Hello ${ member.givenName } ${ member.surname }. Im a Teams conversation bot.`
        );

        const convoParams = {
            members: [member],
            tenantId: context.activity.channelData.tenant.id,
            activity: context.activity
        };
        
        await context.adapter.createConversationAsync(
            process.env.MicrosoftAppId,
            context.activity.channelId,
            context.activity.serviceUrl,
            null,
            convoParams,
            async (context) => {
              console.log("HERE");
                const ref = TurnContext.getConversationReference(context.activity);

                await context.adapter.continueConversationAsync(
                    process.env.MicrosoftAppId,
                    ref,
                    async (context) => {
                      console.log("HERE THERE");
                        await context.sendActivity(message);
                  
                    });
            });
    }));

    await context.sendActivity(MessageFactory.text('All messages have been sent.'));
}



async SendNotificationToAllUsersAsync(context) {
  const TeamMembers = await TeamsInfo.getPagedMembers(context);
  let Sent_msg_Cout = TeamMembers.members.length;
  TeamMembers.members.map(async member => {
      const ref = TurnContext.getConversationReference(context.activity);
      ref.user = member;
      await context.adapter.createConversation(ref, async (context) => {
          const ref = TurnContext.getConversationReference(context.activity);
          await context.adapter.continueConversation(ref, async (context) => {
              await context.sendActivity("Proactive hello.");
          });
      });
  });
  await context.sendActivity(MessageFactory.text("Message sent:" + Sent_msg_Cout));
}
  
  
  async run(parameters: any): Promise<any> {
    const card = Utils.renderAdaptiveCard(rawWishCard);
  
    var context = parameters.context;

      await this.SendNotificationToAllUsersAsync(context);

    return card;
  }
}
