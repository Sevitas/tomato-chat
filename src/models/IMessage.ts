export interface IMessage {
    readonly id: string;
    readonly value: string;
    readonly createdBy: Uuid;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly updatedBy: Uuid;

}
