-- up

CREATE TABLE review{
    _id uuid DEFAULT uuid_generate_v4 (),
    title TEXT,
    Artist TEXT,
    rating INTEGER,
    summary TEXT,
    
}