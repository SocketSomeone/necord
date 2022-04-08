import { BaseDiscovery, DiscoveryType } from '../common';

export interface TextCommandMeta {
	name: string;
}

export class TextCommandDiscovery extends BaseDiscovery<TextCommandMeta> {
	protected type = DiscoveryType.TEXT_COMMAND;

	public getName() {
		return this.meta.name;
	}
}
