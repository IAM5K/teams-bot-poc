import { Activity, TurnContext } from "botbuilder";
import {
  CommandMessage,
  TeamsFxBotCommandHandler,
  TriggerPatterns,
  MessageBuilder,
} from "@microsoft/teamsfx";
import startCard from "./adaptiveCards/start.json";
import { CardData } from "./cardModels";

/**
 * The `HelloWorldCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card if the user types the `triggerPatterns`.
 */
export class StartCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "start";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    console.log(`Bot received message: ${message.text}`);

    // Render your adaptive card for reply message
    const cardData: CardData = {
      title: "Welcome to Tweelin",
      body: "Please use \"Start\" to check the available options. You can skip this and directly create a wish to connect with someone.",
    };

    return MessageBuilder.attachAdaptiveCard<CardData>(startCard, cardData);
  }
}
