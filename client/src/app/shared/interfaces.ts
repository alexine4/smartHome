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
}
