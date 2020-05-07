import React from 'react';
import {Drawer, Router, Scene, Actions, Stack} from 'react-native-router-flux';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Support from './Screens/Support';
import DemandMovies from './Screens/DemandMovies';
import Movies from './Screens/Movies';
import Feedback from './Screens/Feedback';
import Home from './Screens/Home';
import Complaint from './Screens/Complaint';
import Movie from './Screens/Movie';
import SearchPage from './Screens/Search';
import InfoPage from './Screens/InfoPage';
import TVShow from './Screens/TVShows';
import Favourites from './Screens/Favourites';
import SplashScreen from './Screens/SplashScreen';
import AccountSettings from './Screens/AccountSettings';
import UpdateProfile from './Screens/UpdateProfile';
import DrawerComponent from './Components/DrawerComponent';
import {getToken, getUser, url, api, setUser} from './Config/api';
import NeedToPay from './Screens/NeedToPay';
import RegisterPayment from './Screens/RegisterPayment';
import FlagSecure from 'react-native-flag-secure-android';

export default class App extends React.Component {
  state = {
    movies: [],
    search: '',
    filteredMovies: [],
    movie: {},
    isLoggedIn: false,
    movieToPlay: {},
    name: '',
    hasPayed: false,
    fname: '',
    lname: '',
    email: '',
    password: '',
  };
  updateUser = async () => {
    const user = await getUser();
    if (user) {
      this.setState({
        name: user.fname + ' ' + user.lname,
      });
    }
  };
  setRegisterInfo = (fname, lname, email, password) => {
    this.setState(
      {
        fname,
        lname,
        email,
        password,
      },
      () => Actions.registerPayment(),
    );
  };
  getMovies = async () => {
    const token = await getToken();
    const user = await getUser();
    const favourites = user.favourites.map((element) => element._id);
    const response = await api.get('/user/movies', {
      headers: {Authorization: token},
    });
    return response.data.movies.map((element) => {
      const genres = element.genre.map((gen) => gen.trim());
      return {
        ...element,
        image: {uri: url + element.image},
        artwork: {uri: url + element.artwork},
        isFav: favourites.includes(element._id),
        genre: genres,
      };
    });
  };
  getUser = async () => {
    const token = await getToken();
    const user = await getUser();
    const response = await api.get('/admin/user/' + user._id, {
      headers: {Authorization: token},
    });
    await setUser(response.data.user);
    const lastPayments =
      response.data.user.payments[response.data.user.payments.length - 1];
    const lastPaymentDate = new Date(lastPayments.createdAt);
    const accountDate = new Date(response.data.user.createdAt);
    const date = new Date();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
    console.log(response.data.user);
    this.setState({
      hasPayed:
        date - lastPaymentDate < THIRTY_DAYS || date - accountDate < THREE_DAYS,
    });
  };
  selectMovie = (movieID) => {
    let movie = this.state.movies.filter(
      (element) => element._id === movieID,
    )[0];
    this.setState(
      {
        movie,
      },
      () => {
        Actions.info();
      },
    );
  };
  selectMovieToPlay = (movieID) => {
    let movie = this.state.movies.filter(
      (element) => element._id === movieID,
    )[0];
    this.setState(
      {
        movieToPlay: movie,
      },
      () => {
        Actions.movie();
      },
    );
  };
  filterMovies = () => {
    let movies = this.state.movies.filter((element) =>
      element.favourites.includes(this.state.genre),
    );
    this.setState({
      filteredMovies: movies,
    });
  };
  handler = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  searchHandler = (value) => {
    this.setState({
      search: value,
    });
  };
  searchMovies = (text) => {
    let movies = this.state.movies.filter((element) =>
      String(element.title).toLowerCase().includes(text.toLowerCase()),
    );
    this.setState(
      {
        filteredMovies: movies,
        search: text,
      },
      () => {
        Actions.search();
      },
    );
  };
  addToFavourites = async (movieID) => {
    const movie = this.state.movies.filter(
      (element) => element._id === movieID,
    )[0];
    const user = await getUser();
    const token = await getToken();
    user.favourites.push(movie);
    const movies = this.state.movies.map((element) => {
      if (element._id === movieID) {
        return {
          ...element,
          isFav: true,
        };
      } else {
        return element;
      }
    });
    await setUser(user);
    this.setState({
      movies,
    });
    await api.patch(
      '/user/movies/' + user._id + '/favourates',
      {favourites: user.favourites},
      {headers: {Authorization: token}},
    );
  };
  removeFromFavourites = async (movieID) => {
    const user = await getUser();
    user.favourites = user.favourites.filter(
      (element) => element._id !== movieID,
    );
    const token = await getToken();
    const movies = this.state.movies.map((element) => {
      if (element._id === movieID) {
        return {
          ...element,
          isFav: false,
        };
      } else {
        return element;
      }
    });
    await setUser(user);
    this.setState({
      movies,
    });
    await api.patch(
      '/user/movies/' + user._id + '/favourates',
      {favourites: user.favourites},
      {headers: {Authorization: token}},
    );
  };
  favouriteHandler = async (movieID) => {
    const movie = this.state.movies.filter(
      (element) => element._id === movieID,
    )[0];
    if (movie.isFav) {
      await this.removeFromFavourites(movieID);
    } else {
      await this.addToFavourites(movieID);
    }
  };
  signIn = async () => {
    const movies = await this.getMovies();
    this.setState(
      {
        isLoggedIn: true,
        movies,
      },
      async () => {
        // await this.getUser();
        // if (!this.state.hasPayed) {
        //   Actions.needToPay();
        // }
      },
    );
  };
  signOut = () => {
    this.setState({
      isLoggedIn: false,
    });
  };
  componentDidMount = async () => {
    FlagSecure.activate();

    this.updateUser();
    const token = await getToken();
    setTimeout(async () => {
      if (token) {
        this.setState({
          isLoggedIn: true,
        });
        Actions.home();
        const movies = await this.getMovies();
        this.setState({
          movies,
        });
        // await this.getUser();
        // if (!this.state.hasPayed) {
        //   Actions.needToPay();
        // }
      } else {
        Actions.login();
      }
    }, 4000);
  };
  render() {
    return (
      <Router>
        <Drawer
          hideNavBar
          drawerPosition={'right'}
          key="drawer"
          // drawerPosition='right'
          contentComponent={() => {
            return (
              <DrawerComponent
                name={this.state.name}
                signOut={this.signOut}></DrawerComponent>
            );
          }}>
          {!this.state.isLoggedIn && (
            <Scene
              drawerLockMode="locked-closed"
              key="splash"
              hideNavBar
              component={SplashScreen}></Scene>
          )}
          {!this.state.isLoggedIn && (
            <Scene
              drawerLockMode="locked-closed"
              key="login"
              hideNavBar
              component={() => {
                return <Login signIn={this.signIn}></Login>;
              }}></Scene>
          )}

          {!this.state.isLoggedIn && (
            <Scene
              drawerLockMode="locked-closed"
              key="registerPayment"
              hideNavBar
              component={(props) => (
                <RegisterPayment
                  {...props}
                  registerInfo={{
                    email: this.state.email,
                    fname: this.state.fname,
                    lname: this.state.lname,
                    password: this.state.password,
                  }}></RegisterPayment>
              )}></Scene>
          )}
          {!this.state.isLoggedIn && (
            <>
              <Scene
                drawerLockMode="locked-closed"
                key="register"
                hideNavBar
                component={(props) => (
                  <SignUp
                    {...props}
                    setRegisterInfo={this.setRegisterInfo}></SignUp>
                )}></Scene>
            </>
          )}

          <Stack key={'stackRoot'}>
            <Scene
              key="home"
              hideNavBar
              component={() => (
                <Home
                  searchHandler={this.searchMovies}
                  search={this.state.search}
                  selectMovieToPlay={this.selectMovieToPlay}
                  favouriteHandler={this.favouriteHandler}
                  selectMovie={this.selectMovie}
                  movies={this.state.movies}></Home>
              )}></Scene>
            <Scene key="support" hideNavBar component={Support}></Scene>
            <Scene key="account" hideNavBar component={AccountSettings}></Scene>
            <Scene
              key="update"
              hideNavBar
              component={() => (
                <UpdateProfile updateUser={this.updateUser}></UpdateProfile>
              )}></Scene>
            <Scene key="demand" hideNavBar component={DemandMovies}></Scene>
            <Scene
              key="movies"
              hideNavBar
              component={() => {
                return (
                  <Movies
                    searchHandler={this.searchMovies}
                    selectMovie={this.selectMovie}
                    movies={this.state.movies}></Movies>
                );
              }}></Scene>
            <Scene key="feedback" hideNavBar component={Feedback}></Scene>
            <Scene key="complaint" hideNavBar component={Complaint}></Scene>
            <Scene
              key="info"
              hideNavBar
              component={() => {
                return (
                  <InfoPage
                    searchHandler={this.searchMovies}
                    selectMovieToPlay={this.selectMovieToPlay}
                    favouriteHandler={this.favouriteHandler}
                    movie={this.state.movie}></InfoPage>
                );
              }}></Scene>

            <Scene
              key="search"
              hideNavBar
              component={() => (
                <SearchPage
                  search={this.state.search}
                  selectMovie={this.selectMovie}
                  searchHandler={this.searchMovies}
                  movies={this.state.filteredMovies}></SearchPage>
              )}></Scene>
            <Scene
              key="tv"
              hideNavBar
              component={() => {
                return (
                  <TVShow
                    searchHandler={this.searchMovies}
                    selectMovie={this.selectMovie}
                    movies={this.state.movies}></TVShow>
                );
              }}></Scene>
            <Scene
              key="fav"
              hideNavBar
              component={() => {
                return (
                  <Favourites
                    searchHandler={this.searchMovies}
                    selectMovie={this.selectMovie}
                    movies={this.state.movies}></Favourites>
                );
              }}></Scene>
          </Stack>
          <Scene
            drawerLockMode="locked-closed"
            key="movie"
            hideNavBar
            component={() => {
              return <Movie movie={this.state.movieToPlay}></Movie>;
            }}></Scene>
          <Scene
            drawerLockMode="locked-closed"
            key="needToPay"
            hideNavBar
            component={() => (
              <NeedToPay signOut={this.signOut}></NeedToPay>
            )}></Scene>
        </Drawer>
      </Router>
    );
  }
}
