
import { get } from './index'

async function getRemoteServices() {
  return get("/remote-services")
}
