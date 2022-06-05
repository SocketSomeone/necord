import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ArgumentsHost } from '@nestjs/common';
import { NecordContextType } from './necord-execution-context';
import { ClientEvents } from 'discord.js';
import { BaseDiscovery } from '../discovery';
import { ContextOf } from './necord-context.interface';

export interface INecordArgumentsHost extends ArgumentsHost {
	getContext<T extends keyof ClientEvents>(): ContextOf<T>;

	getDiscovery(): BaseDiscovery;
}

export class NecordArgumentsHost extends ExecutionContextHost implements INecordArgumentsHost {
	public static create(context: ArgumentsHost): NecordArgumentsHost {
		const type = context.getType();
		const necContext = new NecordArgumentsHost(context.getArgs());
		necContext.setType(type);
		return necContext;
	}

	public getType<TContext extends string = NecordContextType>(): TContext {
		return super.getType();
	}

	public getContext<T extends keyof ClientEvents>(): ContextOf<T>;
	public getContext<T>(): T;
	public getContext<T extends keyof ClientEvents>(): ContextOf<T> {
		return this.getArgByIndex(0);
	}

	public getDiscovery(): BaseDiscovery {
		return this.getArgByIndex(1);
	}
}
