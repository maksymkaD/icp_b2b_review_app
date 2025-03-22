export const idlFactory = ({ IDL }) => {
    const Review = IDL.Record({
      'id' : IDL.Nat64,
      'author' : IDL.Text,
      'timestamp' : IDL.Nat64,
      'review_text' : IDL.Text,
    });
    return IDL.Service({
      'add_review' : IDL.Func([IDL.Text, IDL.Text], [], []),
      'clear_all_reviews' : IDL.Func([], [], []),
      'get_reviews' : IDL.Func([], [IDL.Vec(Review)], []),
    });
  };
  export const init = ({ IDL }) => { return []; };
  