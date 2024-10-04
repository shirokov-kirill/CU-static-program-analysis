contract Test {
    not_modified: Int = 19; // Bad
    modified: Int = 0; // OK: it is assigned
    const const_val: Int = 19; // OK: it is readonly

    fun set_b(value: Int): Int {
        self.modified = value;
        return self.modified;
    }
}