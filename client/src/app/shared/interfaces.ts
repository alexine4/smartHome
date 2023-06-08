export interface Message {
	message: string
}

export interface Room {
	roomId: number
	typeId: number
	roomName: string
	newRoomName?: string
}

export interface roomAndType {
	roomId: number
	roomName: string
	typeId: number
	typeName: string
}
export interface ScenarionTemp{
	scenarioId: number
	roomId:number
	name:string
	minTemp: number
	maxTemp: number
	timeStart: string
	timeStop: string
	active?: boolean
}

export interface Temperature{
	tempId:number
	roomId:number
	actualTemp: number
}

export interface Type {
	typeId: number
	typeName: string
	newTypeName?: string
}

export interface User {
	userId?: number
	userName?: string
	email: string
	password: string
	homeIp: string
	superUserStatus?: boolean
}

export interface Accessory{
	accessoryId: number
	roomId:number
	accessoryName: string
	accessoryType: string
	status:boolean
	brightnessLevel?: number
	volume?:number
	ventilationRate?:number
}

export interface Sypply{
	sypplyId: number
	houseId: number
	sypplyName: string
	sypplyType: string
	status: boolean
	tarif: number
	sypplyAccount: number
}

export interface Limit{
	sypplyId: number
	perDay: number | null
	perMonth: number | null
}

export interface Calculation{
	sypplyId: number
	amount:number
	cost: number
	createdAt:Date
}

export interface Using {
	sypplyId:number
	amount:number
	createdAt:string
}