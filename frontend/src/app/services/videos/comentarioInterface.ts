export class Comentario {
    comentario!: String;
}

export class Like {
    like!: boolean;
    fk_usuario!: String;
    fk_video!: String;
}