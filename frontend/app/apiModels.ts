export interface Medicine {
    id: string;
    userId: string;
    name: string;
    type: string;
    quantity: number | null;
    refillNotification: number | null;
}
