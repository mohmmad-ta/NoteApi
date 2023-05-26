const {BaseEntity, EntitySchema} = require('typeorm');

class Note extends BaseEntity {
    id;
    title;
    text;
}
const NoteEntity = new EntitySchema({
    name: "note",
    target: Note,
    columns: {
        id: {
            type: Number,
            generated: true,
            primary: true,
        },
        title: {
            type: String,
        },
        text: {
            type: String,
        }
    }
});

const {DataSource} = require('typeorm');

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "",
    password: "2029",
    database: "NodesProject",
    entities: [
        NoteEntity
    ],
    synchronize: true
})

AppDataSource.initialize().then(dataSource => {
    console.log(`The database connected successfully`);
    Note.find().then(results => {
        console.log(results);
    });
    Note.update({
        id: 1
    },{
        title: "This is new title"
    }).then(note => {
        console.log(note)
    })

    Note.delete({id: 1})
    Note.sum('id').then(result =>{
        console.log(`the result is: ${result}`)
    });

}).catch(error => {
    console.log(error);
})