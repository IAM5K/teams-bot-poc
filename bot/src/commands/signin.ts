import { BotCommand } from "../helpers/botCommand";
//const rawListCard = require("../adaptiveCards/active_wish.json");

export class SigninCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*signin\s*/];
  }

  validateParameters(parameters: any): boolean {
    return true;
  }

  async run(parameters: any): Promise<any> {
    this.validateParameters(parameters);    
    
    // Does nothing for the time being
    //
    return null;
  }
}
