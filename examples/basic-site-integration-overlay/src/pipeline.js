import Pipeline from "sajari-react/state/pipeline";

import { Client, Tracking } from "sajari";

import values from "./state";

const client = new Client("etstestest", "trent-kiwi");
const pipeline = new Pipeline(client, "website", values, new Tracking());

export default pipeline;
