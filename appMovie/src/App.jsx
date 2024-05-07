import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/Home/PageNotFound'
import TableMateriales from './components/Movie/TableMateriales'
import { DetailMaterial } from './components/Movie/DetailMaterial'
import { ListMateriales } from './components/Movie/ListMateriales'
import { ListCentroAcopio } from './components/Movie/ListCentroAcopio'
import { DetailCentroAcopio } from './components/Movie/DetailCentroAcopio'
import { ListUsuarios } from './components/Movie/ListUsuarios'
import { ListUsuariosAdmin} from './components/Movie/ListUsuariosAdmin'
import { ListCanje } from './components/Movie/ListCanje'
import { DetailCanje } from './components/Movie/DetailCanje'
import { ListCanjeAdmin } from './components/Movie/ListCanjeAdmin'
import { CreateMaterial } from './components/Movie/CreateMateriales'
import TableCentroAcopio from './components/Movie/TableCentroAcopio'
import { CreateCentroAcopio } from './components/Movie/CreateCentroAcopio'
import { UpdateMaterial } from './components/Movie/UpdateMateriales'
import { UpdateCentroAcopio } from './components/Movie/UpdateCentroAcopio'
import { CreateCanje } from './components/Movie/CreateCanje'
import { Login } from './components/Usuario/Login'
import UserProvider from './components/Usuario/UserProvider'
import { Auth } from './components/Usuario/Auth'
import { Signup } from './components/Usuario/Signup'
import { Logout } from './components/Usuario/Logout'
import { CambiarContra } from './components/Usuario/CambiarContra'
import TableUsuarioCliente from './components/Movie/TableUsuarioCliente'
import { UpdateUsuario } from './components/Movie/UpdateUsuario'
import { CreateUsuarioAdmin } from './components/Movie/CreateUsuarioAdmin'
import TableUsuarioAdmin from './components/Movie/TableUsuarioAdmin'
import { CreateUsuarioCliente } from './components/Movie/CreateUsuarioCliente'
import TableCupones from './components/Movie/TableCupones'
import { CreateCupones } from './components/Movie/CreateCupones'
import { UpdateCupones } from './components/Movie/UpdateCupones'
import { CreateCanjeCupon } from './components/Movie/CreateCanjeCupon'
import { ListCuponesCanjeados } from './components/Movie/ListCuponesCanjeados'
import { DetailBilletera } from './components/Movie/DetailBilletera'
import { DashboardCentroAcopio } from './components/Movie/DashboardCentroAcopio'
import { DashboardAdmin } from './components/Movie/DashboardAdmin'


const router= createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path: '*',
    element: <PageNotFound />
  },
  {
    path:'/',
    element:<Auth allowedRoles={['admin']} />,
    children:[
      {
        path: '/materiales-table',
        element: <TableMateriales/>
      },
      {
        path: '/centroAcopio-table',
        element: <TableCentroAcopio/>
      },
      {
        path: '/createMaterial',
        element: <CreateMaterial/>
      }, 
      {
        path: '/createCentroAcopio',
        element: <CreateCentroAcopio/>
      },
      {
        path: '/updateMaterial/:id',
        element: <UpdateMaterial/>
      },
      {
        path: '/updateCentroAcopio/:id',
        element: <UpdateCentroAcopio/>
      },
      {
        path: '/clienteList',
        element: <TableUsuarioCliente/>
      },
      {
        path: 'updateUsuario/:id',
        element: <UpdateUsuario/>
      },
      {
        path: 'adminList',
        element: <TableUsuarioAdmin/>
      },
      {
        path: 'createAdmin',
        element: <CreateUsuarioAdmin/>
      },
      {
        path: '/createCliente',
        element: <CreateUsuarioCliente/>
      },
      {
        path: '/cuponesList',
        element: <TableCupones/>
      },
      {
        path: '/createCupones',
        element: <CreateCupones/>
      },
      {
        path: '/updateCupones/:id',
        element: <UpdateCupones/>
      },
      {
        path: '/dashboardAdmin',
        element: <DashboardAdmin/>
      }
    ]
  },
  {
    path:'/',
    element:<Auth allowedRoles={['adminCentroAcopio']} />,
    children:[
      {
        path: '/usuarioAdmin',
        element: <ListUsuariosAdmin/>
      }, 
      {
        path: '/usuarioAdmin/:id',
        element: <ListCanjeAdmin/>
      },
      {
        path: '/canjeAdmin/:id',
        element: <DetailCanje/>
      },
      {
        path: '/createCanje',
        element: <CreateCanje/>
      },
      {
        path: '/dashboardCentroAcopio',
        element: <DashboardCentroAcopio/>
      }
    ]
  },
  {
    path:'/',
    element:<Auth allowedRoles={['cliente']} />,
    children:[
      {
        path: '/usuario',
        element: <ListUsuarios/>
      },
      {
        path: '/usuario/:id',
        element: <ListCanje/>
      },
      {
        path: '/canje/:id',
        element: <DetailCanje/>
      },
      {
        path: '/createCanjeCupon',
        element: <CreateCanjeCupon/>
      },
      {
        path: '/cuponesCanjeadosList',
        element: <ListCuponesCanjeados/>
      },
      {
        path: '/detailBilletera',
        element: <DetailBilletera/>
      }
    ]
  },
  {
    path: '/material',
    element: <ListMateriales/>
  },
  {
    path: '/material/:id',
    element: <DetailMaterial />
  }, 
  {
    path: '/centro_acopio',
    element: <ListCentroAcopio/>
  }, 
  {
    path: '/centro_acopio/:id',
    element: <DetailCentroAcopio/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/createUsuario',
    element: <Signup/>
  },
  {
    path: '/logout',
    element: <Logout/>
  },
  {
    path: '/cambiarContra/:id',
    element: <CambiarContra/>
  }
])

export default function App(){
  return (
    <UserProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </UserProvider>
  )
}
