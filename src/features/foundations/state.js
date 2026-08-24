export function createFoundationState() {
  return {
    bodySelectedChineseId: null, bodySelectedEnglishId: null, bodyMatchedIds: new Set(), bodyRoundIds: [], bodyChineseOrder: [], bodyEnglishOrder: [], bodyMatchUniverseKey: "", lastBodyFeedback: "", bodySpotlightPromptId: "", bodySpotlightOptionIds: [], bodySpotlightResult: "", bodySpotlightWrongIds: new Set(),
    numberChallengeStageId: "", numberChallengeTargetValue: null, numberChallengeOptionValues: [], lastNumberFeedback: "", numberChallengeAdvanceTimer: null,
    mathChallengeStageId: "", mathChallengeOperator: "+", mathChallengeLeft: null, mathChallengeRight: null, mathChallengeAnswer: null, lastMathFeedback: "", mathChallengeSolved: false, mathChallengeInput: "",
    greetingsChallengeAnswerId: "", greetingsChallengeOptionIds: [], greetingsChallengePickedId: "", greetingsChallengePromptId: "", greetingsChallengeResult: "", greetingsChallengeWrongIds: new Set(), lastGreetingsFeedback: "", greetingsListenFeedback: "", greetingsMatchFeedback: "", greetingsSelectedPhraseId: null, greetingsMatchedIds: new Set(), greetingsPhraseOrder: [], greetingsMeaningOrder: [],
    familyChallengeAnswerId: "", familyChallengeOptionIds: [], familyChallengePickedId: "", familyChallengePromptId: "", familyChallengeResult: "", familyChallengeWrongIds: new Set(), lastFamilyFeedback: "", familyListenFeedback: "", familyMatchFeedback: "", familySelectedPhraseId: null, familyMatchedIds: new Set(), familyPhraseOrder: [], familyMeaningOrder: [],
    introductionsChallengeAnswerId: "", introductionsChallengeOptionIds: [], introductionsChallengePromptId: "", lastIntroductionsFeedback: "", introductionsBuildTargetId: "", introductionsBuildAvailableTokens: [], introductionsBuildSelectedTokens: [],
    ageChallengeAnswerId: "", ageChallengeOptionIds: [], ageChallengePromptId: "", lastAgeFeedback: "", ageBuildTargetId: "", ageBuildAvailableTokens: [], ageBuildSelectedTokens: [],
    politeChallengeAnswerId: "", politeChallengeOptionIds: [], politeChallengePickedId: "", politeChallengePromptId: "", politeChallengeResult: "", politeChallengeWrongIds: new Set(), lastPoliteFeedback: "", politeListenFeedback: "", politeMatchFeedback: "", politeSelectedPhraseId: null, politeMatchedIds: new Set(), politePhraseOrder: [], politeMeaningOrder: [],
    nationalityChallengeAnswerId: "", nationalityChallengeOptionIds: [], nationalityChallengePickedId: "", nationalityChallengeResult: "", nationalityChallengeWrongIds: new Set(), nationalityListenFeedback: ""
  };
}
