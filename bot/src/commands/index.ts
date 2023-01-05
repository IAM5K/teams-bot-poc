import { BotCommand } from "../helpers/botCommand";
import { ShowUserProfile } from "./showUserProfile";
import { WelcomeCommand } from "./welcome";
import { ListCommand } from "./list";
import { SigninCommand } from "./signin";
import { WishCommand } from "./wish";

export const commands: BotCommand[] = [
  new ShowUserProfile(),
  new WelcomeCommand(),
  new ListCommand(),
  new SigninCommand(),
  new WishCommand(),
];
