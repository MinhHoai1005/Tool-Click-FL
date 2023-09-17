import { all, fork } from "redux-saga/effects"
import { setAuthWatcher } from "./Auth/sagas"

export default function* rootSagas() {
    yield all([
        // `fork()` any other store sagas down here...
        fork(setAuthWatcher),
    ])
}
