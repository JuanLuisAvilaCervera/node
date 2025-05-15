
interface RoomInterface {
    room_number: number,
    description : string,
    offer: boolean,
    price: number,
    discount: number,
    cancellation_policy: string,
    photos : string[],
    room_type: "Single Bed" | "Double Bed" | "Double Superior" | "Suite", 
}

export {RoomInterface}

    // photos : string[],

    // room_type: "Single Bed" | "Double Bed" | "Double Superior" | "Suite",

