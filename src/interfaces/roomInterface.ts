
interface RoomInterface {
    room_number: number,
    room_type: string,
    description : string,
    photos: null,
    offer: boolean,
    price: number,
    discount: number,
    cancellation_policy: string,
    amenities: string
}

export {RoomInterface}