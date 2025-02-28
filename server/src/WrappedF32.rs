use std::hash::{Hash, Hasher};

#[derive(Copy, Clone, Debug)]
pub struct WrappedF32(pub f32);

impl PartialEq for WrappedF32 {
    fn eq(&self, other: &Self) -> bool {
        // Compare bitwise so that +0.0 and -0.0 are distinct
        self.0.to_bits() == other.0.to_bits()
    }
}

impl From<f32> for WrappedF32 {
    fn from(value: f32) -> Self {
        Self(value)
    }
}

impl From<WrappedF32> for f32 {
    fn from(value: WrappedF32) -> Self {
        value.0
    }
}

impl Eq for WrappedF32 {}

impl Hash for WrappedF32 {
    fn hash<H: Hasher>(&self, state: &mut H) {
        // Hash the underlying bits.
        self.0.to_bits().hash(state);
    }
}
