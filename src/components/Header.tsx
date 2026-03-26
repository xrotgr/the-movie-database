import { Link } from '@tanstack/react-router';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export const Header = () => {
  return (
    <header className="flex items-center p-2">
      <Link to="/">Logo</Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <Link to="/movie">Popular</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/movie/now-playing">Now Playing</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/movie/top-rated">Top Rated</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/movie/upcoming">Upcoming</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>TV Shows</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="w-3xs" asChild>
                <Link to="/tv">Popular</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/tv/airing-today">{'Airing Today'}</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/tv/on-the-air">On TV</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/tv/top-rated">Top Rated</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
