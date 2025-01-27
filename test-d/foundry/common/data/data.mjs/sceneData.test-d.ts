import { expectError, expectType } from 'tsd';

expectError(new foundry.data.SceneData());
expectError(new foundry.data.SceneData({}));
expectType<foundry.data.SceneData>(new foundry.data.SceneData({ name: 'A long expected journey' }));
expectType<foundry.data.SceneData>(
  new foundry.data.SceneData({
    _id: undefined,
    name: 'A long expected journey',
    active: undefined,
    navigation: undefined,
    navOrder: undefined,
    navName: undefined,
    img: undefined,
    foreground: undefined,
    thumb: undefined,
    width: undefined,
    height: undefined,
    padding: undefined,
    initial: undefined,
    backgroundColor: undefined,
    gridType: undefined,
    grid: undefined,
    shiftX: undefined,
    shiftY: undefined,
    gridColor: undefined,
    gridAlpha: undefined,
    gridDistance: undefined,
    gridUnits: undefined,
    tokenVision: undefined,
    fogExploration: undefined,
    fogReset: undefined,
    globalLight: undefined,
    globalLightThreshold: undefined,
    darkness: undefined,
    drawings: undefined,
    tokens: undefined,
    lights: undefined,
    notes: undefined,
    sounds: undefined,
    templates: undefined,
    tiles: undefined,
    walls: undefined,
    playlist: undefined,
    playlistSound: undefined,
    journal: undefined,
    weather: undefined,
    folder: undefined,
    sort: undefined,
    permission: undefined,
    flags: undefined
  })
);
expectType<foundry.data.SceneData>(
  new foundry.data.SceneData({
    _id: null,
    name: 'A long expected journey',
    active: null,
    navigation: null,
    navOrder: null,
    navName: null,
    img: null,
    foreground: null,
    thumb: null,
    width: null,
    height: null,
    padding: null,
    initial: null,
    backgroundColor: null,
    gridType: null,
    grid: null,
    shiftX: null,
    shiftY: null,
    gridColor: null,
    gridAlpha: null,
    gridDistance: null,
    gridUnits: null,
    tokenVision: null,
    fogExploration: null,
    fogReset: null,
    globalLight: null,
    globalLightThreshold: null,
    darkness: null,
    drawings: null,
    tokens: null,
    lights: null,
    notes: null,
    sounds: null,
    templates: null,
    tiles: null,
    walls: null,
    playlist: null,
    playlistSound: null,
    journal: null,
    weather: null,
    folder: null,
    sort: null,
    permission: null,
    flags: null
  })
);
