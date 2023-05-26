const notes = [
    {
        id: 1, title: "This is my first note", text: "Blah blah blah"
    },
    {
        id: 2, title: "This is my second note", text: "Blah blah blah"
    },
];
exports.getAllNodes = async (req, res)=>{
    try {
        res.status(200).json({ notes })
    }catch (err) {
        res.status(400).json({ err })
    }
}
exports.getOneNodes = async (req, res)=>{
    try {
        const note = notes.find(note => note.id === req.params.id);
        console.log(note)
        if (note === null ) return
        res.status(200).json({ note })
    }catch (err) {
        res.status(400).json({ err })
    }
}
exports.createNode = async (req, res)=>{
    try {
        if (req.body.title !== null && req.body.text !== null){
            const {title, body} = req.body;
            const newNote = {
                id: Math.floor(Math.random()*1000000),
                title, body,
            };
            notes.push(newNote)
            res.status(201).json({ newNote })
        }else {
            res.status(400).json({ mes: 'Your data not valid' })
        }
    }catch (err) {
        res.status(400).json({ err })
    }
}
exports.deleteNode =  async (req, res)=>{
    try {
        const note = notes.findIndex(note => note.id === req.params.id);
        if (note === null ) return
        const delNode =  notes.pop(note)
        res.status(200).json({ delNode })
    }catch (err) {
        res.status(400).json({ err })
    }
}
exports.updateNode = async (req, res)=>{
    try {
        const note = notes.find(note => note.id == req.params.id);
        if (note == null) {
            return res.status(404);
        }
        const {title, body} = req.body;
        const updatedNote = {
            ...note,
            title: title ?? note.title,
            text: body ?? note.text,
        }
        const index = notes.indexOf(note);
        notes[index] = updatedNote;
        res.status(202).json(updatedNote)
    }catch (err) {
        res.status(400).json({ err })
    }
}