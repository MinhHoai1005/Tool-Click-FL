// eslint-disable-next-line import/no-anonymous-default-export
export default {
    calculateSelectedIndex: (currentIndexSelected: number, currentIndexDeleted: number) => {
        let currentStepIndex = 0
        if (currentIndexSelected !== 0 && currentIndexDeleted !== 0) {
            // if not first message
            if (currentIndexSelected === currentIndexDeleted || currentIndexSelected - 1 === currentIndexDeleted) {
                // delete last message and message selected have current position is last message or near last
                currentStepIndex = currentIndexSelected - 1 // Move meassage selected back 1 step
            }
        }
        return currentStepIndex
    },
    log: (...args: any[]) => {
        if (process.env.NODE_ENV !== "production") {
            console.log(...args)
        }
    },
}

