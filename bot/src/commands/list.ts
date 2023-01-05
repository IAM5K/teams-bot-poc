import {
  MessageFactory
} from "botbuilder";

import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
const rawListCard = require("../adaptiveCards/active_wish.json");

export class ListCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*list\s*/];
  }

  validateParameters(parameters: any): boolean {
    //if (!parameters.likeCount) {
    //  throw new Error(`Command "list" failed: missing input "likeCount"`);
    //}
    return true;
  }

  async run(parameters: any): Promise<any> {
    this.validateParameters(parameters);    
    for (let i = 0; i < 3; i++) {
      var card = Utils.renderAdaptiveCard(rawListCard, {user_id: "123456", wish_id: i, description: `wish # ${i}`});
      await parameters.context.sendActivity({ attachments: [card] });
    }
    
    
for(const teamMember of global.members){
  var message1;

  message1 = MessageFactory.text(`Channel members are: ${teamMember.name} ${teamMember.userPrincipalName} ${teamMember.tenantId} ${teamMember.id}`);
  await parameters.context.sendActivity(message1); 
};

    return card;
  }

  async deleteWish(wishID: string) {
    // delete the wish
    return true;
  }
}
