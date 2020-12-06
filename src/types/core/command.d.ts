export interface Command {
  name: string;
  description: string;
  args: boolean;
  aliases?: Array<string>;
  usage?: string;
  roles?: Array<string>;
  channels?: Array<string>;
  category?: Array<string>;
  cooldown?: number;
  guildOnly?: boolean;
  execute(message, args): void;
}
