import { expectType } from 'tsd';

const combatant = new Combatant({}, {});

// static properties of `BaseCombatant`
expectType<typeof foundry.data.CombatantData>(Combatant.schema);

// properties
expectType<string | null>(combatant.pack);
//expectType<BaseCombat | null>(combatant.parent); //TODO change to Combat once it is typed
expectType<Actor | null>(combatant.actor);
expectType<TokenDocument | null>(combatant.token);
expectType<Record<string, Application>>(combatant.apps);

// static properties
expectType<Promise<Combatant | undefined>>(Combatant.create({ name: 'Some Combatant' }));
expectType<Promise<Combatant[]>>(Combatant.createDocuments([]));
expectType<Promise<Combatant[]>>(Combatant.updateDocuments([]));
expectType<Promise<Combatant[]>>(Combatant.deleteDocuments([]));
