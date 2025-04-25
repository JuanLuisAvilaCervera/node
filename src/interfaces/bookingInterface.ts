
interface BookingInterface {
    booking_id: number,
    client_id: number,
    room_id: number,
    order_date: string,
    check_in_date:string,
    check_out_date:string,
    status: string,
    special_request: string,

}

export {BookingInterface}