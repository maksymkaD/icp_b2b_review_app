use candid::CandidType;
use ic_cdk::storage; 
use ic_cdk::api::time;  
use serde::Deserialize; 
use std::hash::{Hash, Hasher};
use std::collections::hash_map::DefaultHasher;

#[derive(CandidType, Deserialize, Clone)]
pub struct Review {
    pub id: u64,
    pub author: String,
    pub review_text: String,
    pub timestamp: u64,
}

#[derive(CandidType, Deserialize)]
pub struct State {
    pub reviews: Vec<Review>
}

#[ic_cdk::init]
fn init() {
    let initial_state = State { reviews: Vec::new() };
    storage::stable_save((initial_state,)).expect("Failed to initialize state");
}


#[ic_cdk::query]
fn get_reviews() -> Vec<Review> {
    match storage::stable_restore::<(State,)>() {
        Ok((state,)) => state.reviews,
        Err(_) => Vec::new(), 
    }
}

fn calculate_hash<T: Hash>(t: &T) -> u64 {
    let mut hasher = DefaultHasher::new();
    t.hash(&mut hasher);
    hasher.finish()
}

#[ic_cdk::update]
fn clear_all_reviews() {
    storage::stable_save((State { reviews: Vec::new() },)).expect("Failed to clear reviews");
}   

#[ic_cdk::update]
fn add_review(author: String, review_text: String) {
    let timestamp = time();

    let combined = format!("{}{}{}", author, review_text, timestamp);

    let id = calculate_hash(&combined);

    let (mut state,): (State,) = storage::stable_restore().unwrap_or_else(|_| (State { reviews: Vec::new() },));

    let new_review = Review {
        id,
        author,
        review_text,
        timestamp,
    };
    state.reviews.push(new_review);
    
    storage::stable_save((state,)).expect("Failed to save state");
}