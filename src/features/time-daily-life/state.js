export function createTimeDailyLifeState() {
  return {
    weekdayChallengeAnswerId: "", weekdayChallengeOptionIds: [], weekdayChallengePickedId: "", weekdayChallengePromptId: "", weekdayChallengeResult: "", weekdayChallengeWrongIds: new Set(), weekdayListenFeedback: "", weekdayMatchFeedback: "", weekdaySelectedPhraseId: null, weekdayMatchedIds: new Set(), weekdayPhraseOrder: [], weekdayMeaningOrder: [],
    clothesQuizOrder: [], clothesQuizIndex: 0, clothesQuizOptionIds: [], clothesQuizSelectedId: "", clothesQuizResult: "",
    timeRoutineQuizOrder: [], timeRoutineQuizIndex: 0, timeRoutineQuizOptionIds: [], timeRoutineQuizSelectedId: "", timeRoutineQuizResult: "",
    clockQuizOrder: [], clockQuizIndex: 0, clockQuizOptionIds: [], clockQuizSelectedId: "", clockQuizResult: "",
    roomBuildOrder: [], roomBuildIndex: 0, roomBuildAvailableTokens: [], roomBuildSelectedTokens: [], roomBuildResult: "",
    dateChallengeAnswerId: "", dateChallengeOptionIds: [], dateChallengePickedId: "", dateChallengePromptId: "", dateChallengeResult: "", dateChallengeWrongIds: new Set(), dateListenFeedback: "", dateMatchFeedback: "", dateSelectedPhraseId: null, dateMatchedIds: new Set(), datePhraseOrder: [], dateEventOrder: [],
    transportBuildOrder: [], transportBuildIndex: 0, transportBuildAvailableTokens: [], transportBuildSelectedTokens: [], transportBuildResult: "",
    positionQuizOrder: [], positionQuizIndex: 0, positionQuizOptionIds: [], positionQuizSelectedId: "", positionQuizResult: "",
    comparisonBuildOrder: [], comparisonBuildIndex: 0, comparisonBuildAvailableTokens: [], comparisonBuildSelectedTokens: [], comparisonBuildResult: ""
  };
}
