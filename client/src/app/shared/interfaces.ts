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