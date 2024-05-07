import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Avatar,  MenuList } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useContext, useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { UserContext } from '../../context/UserContext';

function Header() {

  const {user, decodeToken, autorize}=useContext(UserContext)
  const [userData, setUserData] = useState(decodeToken())
  useEffect(() => {
    setUserData(decodeToken())
  }, [user])
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{
      backgroundColor: 'primary.main',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <RecyclingIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Ziry
          </Typography>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>           
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem component='a' href='/movie/'>
                  <Typography textAlign="center">Materiales</Typography>
                </MenuItem>
                <MenuItem component='a' href='/movie-table/'>
                  <Typography textAlign="center">Mantenimiento Materiales</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <RecyclingIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          
          <Typography
            variant="p"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Películas
          </Typography>
          
          
{/* Menu de Matenimientos */}
<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Mantenimientos">
              <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
              <Avatar  variant="rounded">
                <SettingsIcon />
              </Avatar>                
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
                {user && autorize({allowedRoles:['cliente', 'adminCentroAcopio', 'admin']}) && 
                <MenuItem component='a' href='/material/'>
                  <Typography textAlign="center">Materiales</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['cliente', 'adminCentroAcopio', 'admin']}) && 
                <MenuItem component='a' href='/centro_acopio/'>
                  <Typography textAlign="center">Centros de Acopio</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['admin']}) && 
                <MenuItem component='a' href='/materiales-table/'>
                  <Typography textAlign="center">Mantenimiento Materiales</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['admin']}) && 
                <MenuItem component='a' href='/centroAcopio-table'>
                  <Typography textAlign="center">Mantenimiento Centro de Acopio</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['admin']}) && 
                <MenuItem component='a' href='/cuponesList'>
                  <Typography textAlign="center">Mantenimiento Cupones</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['cliente']}) && 
                <MenuItem component='a' href='/usuario/'>
                  <Typography textAlign="center">Usuarios Canje</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['cliente']}) && 
                <MenuItem component='a' href='/createCanjeCupon/'>
                  <Typography textAlign="center">Canjear Cupones</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['cliente']}) && 
                <MenuItem component='a' href='/cuponesCanjeadosList'>
                  <Typography textAlign="center">Lista de Cupones Canjeados</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['cliente']}) && 
                <MenuItem component='a' href='/detailBilletera'>
                  <Typography textAlign="center">Billetera</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['adminCentroAcopio']}) && 
                <MenuItem component='a' href='/usuarioAdmin/'>
                  <Typography textAlign="center">Admin Canje</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['adminCentroAcopio']}) && 
                <MenuItem component='a' href='/createCanje/'>
                  <Typography textAlign="center">Crear Canje</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['adminCentroAcopio']}) && 
                <MenuItem component='a' href='/dashboardCentroAcopio'>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['admin']}) && 
                <MenuItem component='a' href='/clienteList'>
                  <Typography textAlign="center">Lista de Clientes</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['admin']}) && 
                <MenuItem component='a' href='/adminList'>
                  <Typography textAlign="center">Lista de Administradores de Centros de Acopio</Typography>
                </MenuItem>
                }
                {user && autorize({allowedRoles:['admin']}) && 
                <MenuItem component='a' href='/dashboardAdmin'>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                }
            
            </Menu>
          </Box>
{/* Menu de Matenimientos */}

 {/* Menu Usuarios */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Usuario">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon style={{ fill:'white'}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!userData && (
              <MenuList>
              <MenuItem component='a' href='/createUsuario/'>
                  <Typography textAlign="center">Crear Usuario</Typography>
                </MenuItem>
                <MenuItem component='a' href='/login/'>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              </MenuList>
            )}  

              {userData && (
                <MenuList>
                <MenuItem>
                  <Typography variant='subtitle1' gutterBottom>
                    {userData?.email}                  
                  </Typography>
                </MenuItem>
                <MenuItem color='secondary' component='a' href='/logout'>
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
                <MenuItem component='a' href={`/cambiarContra/${userData.id}`}>
                  <Typography textAlign="center">Cambiar Contraseña</Typography>
                </MenuItem>
              </MenuList>
              )}
            
            </Menu>
          </Box>
{/* Menu Usuarios */}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;