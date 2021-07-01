import { FieldReturnType, PropertiesToSource, ToObjectFalseType } from '../../../../types/helperTypes.js';
import DocumentData from '../../abstract/data.mjs';
import { documents } from '../../module.mjs.js';
import * as fields from '../fields.mjs';
import { TokenDataConstructorData, TokenDataProperties, TokenDataSchema } from './tokenData.js';

type FieldExclusions =
  | '_id'
  | 'actorId'
  | 'actorData'
  | 'img'
  | 'x'
  | 'y'
  | 'elevation'
  | 'effects'
  | 'overlayEffect'
  | 'hidden';

interface PrototypeTokenDataSchema extends Omit<TokenDataSchema, FieldExclusions> {
  randomImg: typeof fields.BOOLEAN_FIELD;
  img: FieldReturnType<
    typeof fields.VIDEO_FIELD,
    { default: typeof foundry.CONST.DEFAULT_TOKEN; validate: (src: unknown) => boolean }
  >;
}

interface PrototypeTokenDataProperties extends Omit<TokenDataProperties, FieldExclusions> {
  /**
   * Uses a random "wildcard" image path which is resolved with a Token is created
   * @defaultValue `false`
   */
  randomImg: boolean;

  /**
   * A file path to an image or video file used to depict the Token
   * @defaultValue `CONST.DEFAULT_TOKEN`
   */
  img: string | null;
}

export interface PrototypeTokenDataConstructorData extends Omit<TokenDataConstructorData, FieldExclusions> {
  /**
   * Uses a random "wildcard" image path which is resolved with a Token is created
   * @defaultValue `false`
   */
  randomImg?: boolean | null;

  /**
   * A file path to an image or video file used to depict the Token
   * @defaultValue `CONST.DEFAULT_TOKEN`
   */
  img?: string | null;
}

export class PrototypeTokenData extends DocumentData<
  PrototypeTokenDataSchema,
  PrototypeTokenDataProperties,
  PropertiesToSource<PrototypeTokenDataProperties>,
  PrototypeTokenDataConstructorData,
  documents.BaseActor
> {
  /**
   * @override
   */
  _initialize(): void;

  /**
   * @override
   */
  toObject(source?: true): ReturnType<this['toJSON']> & { actorId: documents.BaseActor['id'] };
  toObject(source: false): {
    [Key in keyof PrototypeTokenDataSchema as string extends Key ? never : Key]: Key extends keyof this
      ? ToObjectFalseType<this[Key]>
      : undefined;
  } & { actorId: documents.BaseActor['id'] };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PrototypeTokenData extends PrototypeTokenDataProperties {}
