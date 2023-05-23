export interface User {
	userId?: number
	userName?: string
	email: string
	password: string
	homeIp: string
	superUserStatus?: boolean
}

export interface Room{
	roomId: number
	typeId: number
	roomName: string
	newRoomName?: string
}

export interface Type{
typeId: number
typeName: string
newTypeName?: string
}

export interface roomAndType{
	roomId: number
	roomName: string
	typeId: number
	typeName: string
	}

export interface Message{
	message: string
}