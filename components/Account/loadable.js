import Loading from '../Loading'
import dynamic from 'next/dynamic'

const loading = () => <div className='account-loading-screen'><Loading/></div>

export const LoadRegistration = dynamic(
  () => import('../Registration'),
  { loading: () => loading() }
)

export const LoadStatus = dynamic(
  () => import('../Status'),
  { loading: () => loading() }
)
export const LoadAddVehicle = dynamic(
  () => import('../AddVehicle'),
  { loading: () => loading() }
)
