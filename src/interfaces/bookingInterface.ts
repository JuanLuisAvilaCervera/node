import { ClientInterface } from "./clientInterface"
import { RoomInterface } from "./roomInterface"

interface BookingInterface {
    booking_id: number,
    client : ClientInterface,
    room : RoomInterface,
    order_date: string,
    check_in_date:string,
    check_out_date:string,
    status: string,
    special_request: string,

}

export {BookingInterface}