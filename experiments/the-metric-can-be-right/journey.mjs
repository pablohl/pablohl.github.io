export function createJourney() {
  return {
    stage: 0,
    choice: null,
    prediction: null,
    view: 'compare',
    outcomeFilter: 'all',
    declineCost: 350,
    reviews: [],
    nextChoice: null,
    counterfactualOpen: false,
    counterfactualChoice: null,
  };
}

export function updateJourney(state, action) {
  if (action.type === 'reset') return createJourney();
  switch (action.type) {
    case 'stage':
      return { ...state, stage: Math.max(0, Math.min(4, action.stage)) };
    case 'choice':
      return { ...state, choice: action.value };
    case 'prediction':
      return { ...state, prediction: action.value };
    case 'view':
      return { ...state, view: action.value };
    case 'filter':
      return { ...state, outcomeFilter: action.value };
    case 'cost':
      return { ...state, declineCost: action.value };
    case 'review':
      return { ...state, reviews: state.reviews.includes(action.value) ? state.reviews : [...state.reviews, action.value] };
    case 'nextChoice':
      return { ...state, nextChoice: action.value };
    case 'openCounterfactual':
      return state.nextChoice ? { ...state, counterfactualOpen: true } : state;
    case 'counterfactualChoice':
      return state.counterfactualOpen ? { ...state, counterfactualChoice: action.value } : state;
    default:
      return state;
  }
}
