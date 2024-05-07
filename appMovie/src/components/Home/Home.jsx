import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
export function Home () {
  return (
    <Container sx={{ p: 2 }} maxWidth='sm'>
      <Typography
        component='h1'
        variant='h2'
        align='center'
        color='text.primary'
        gutterBottom
      >
        Ziry
      </Typography>
      <Typography variant='h5' align='center' color='text.secondary' paragraph>
        Canjee sus materiales reciclables por cupones para el cine, comida y muchas cosas más...
      </Typography>
    </Container>
  )
}