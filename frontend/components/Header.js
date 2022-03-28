import { useState } from "react";
import {
  Navbar, NavbarBrand, NavbarToggler, Collapse, Nav,
  NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, NavbarText,
} from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Navbar
      color="light"
      expand="md"
      light
    >
      <NavbarBrand href="/">
        reactstrap
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav
          className="ms-auto"
          navbar
        >
          <NavItem>
            <NavLink href="/components/">
              Components
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">
              GitHub
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Header;
