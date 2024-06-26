/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "antd";

import {
	LogoutOutlined,
	SettingOutlined,
	LeftOutlined,
	LoginOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation } from "react-router-dom";

import { ReactComponent as BlackPageIcon } from "../../Assets/black-pagelogo.svg";
import { ReactComponent as WhitePageIcon } from "../../Assets/white-pagelogo.svg";
import { ReactComponent as NavBarToggle } from "../../Assets/navBarToggle.svg";
import ContainerTow from "../../Container/ContainerTwo/containerTwo.component";
import NavBartoggle from "../../Components/NavBarToggle/navbartoggle.component";

import SearchButton from "../../Components/SearchButton/Searchbutton.component";
import SearchContainer from "../../Components/SearchContainer/SearchContainer.component";

import { selectorCurrentUser } from "../../Store/users/user.selector";
import HeadPortrait from "../../Components/HeadPortrait/headportrait.component";
import { signOutStart } from "../../Store/users/user.action";
import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLinks2,
	NavLink,
	NavLinkCurrent,
	NavLinkIcon,
	BrightnessPageButton,
} from "./navigation.style";
import Modal from "../../composite/Modal";
import { useMoveBack } from "../../hooks/useMoveBack";

const Navigation = () => {
	const [click, setClick] = useState(false);
	const [currentnavigate, setCurrentnavigate] = useState("");
	const [toggle, setToggle] = useState(false);
	const [isFakeDark, setIsFakeDark] = useState(false);

	const currentUser = useSelector(selectorCurrentUser);

	const dispatch = useDispatch();
	const back = useMoveBack();

	// 获取当前屏幕尺寸
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const updateSize = () =>
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	const clikcHandler = () => {
		setClick(!click);
		setIsFakeDark((isFakeDark) => !isFakeDark);
	};
	const navis = useMemo(
		() => [
			{ to: "/navi/articles", child: "文章" },
			{ to: "/navi/categories", child: "分类/标签" },
			{ to: "/navi/friendship", child: "链接" },
			{ to: "/navi/component", child: "组件" },
			{ to: "/navi/aboutblog", child: "Blog" },
			{ to: "/navi/aboutme", child: "Me" },
			{ to: "/navi/more", child: "更多" },
		],
		[],
	);

	const localtion = useLocation();
	useEffect(() => {
		navis.forEach((navi) => {
			if (navi.to === localtion.pathname) {
				setCurrentnavigate(navi.child);
			}
		});
	}, [localtion.pathname, navis]);

	const toggleHandler = () => {
		setToggle(!toggle);
	};

	const NaviCon = windowSize.width < 1000 ? NavLinks2 : NavLinks;

	const signOutHandle = async () => {
		dispatch(signOutStart());
	};
	useEffect(
		function () {
			document.documentElement.classList.toggle("fake-dark-mode");
		},
		[isFakeDark],
	);

	const items = [
		{
			key: "1",
			label: <NavLink to='/navi/yourself'>主页</NavLink>,
			icon: <SettingOutlined />,
		},
		{
			key: "2",
			label: <NavLink onClick={signOutHandle}>登出</NavLink>,
			icon: <LogoutOutlined />,
		},
	];

	function scolltoTop() {
		window.scrollTo(0, 0);
	}

	return (
		<Fragment>
			<ContainerTow>
				<NavigationContainer onClick={scolltoTop}>
					{windowSize.width < 1000 && (
						<div>
							{windowSize.width < 480 && (
								<BrightnessPageButton onClick={back}>
									<NavBartoggle color='white'>
										<LeftOutlined />
									</NavBartoggle>
								</BrightnessPageButton>
							)}
							<BrightnessPageButton onClick={toggleHandler}>
								<NavBartoggle color='white'>
									<NavBarToggle />
								</NavBartoggle>
							</BrightnessPageButton>
						</div>
					)}

					<LogoContainer to='/'>
						<img src='/favicon.png' alt='logo' />
					</LogoContainer>

					<NaviCon onClick={toggleHandler} click={toggle}>
						{navis.map((navi) => {
							if (navi.child === currentnavigate) {
								return (
									<NavLinkCurrent to={navi.to} key={navi.child}>
										{navi.child}
									</NavLinkCurrent>
								);
							}
							return (
								<NavLink to={navi.to} key={navi.child}>
									{navi.child}
								</NavLink>
							);
						})}

						<BrightnessPageButton>
							<NavLinkIcon
								href='https://github.com/2791666300/Lemon-blog'
								target='blank'></NavLinkIcon>
						</BrightnessPageButton>

						<BrightnessPageButton onClick={clikcHandler} click={click}>
							{click ? <WhitePageIcon /> : <BlackPageIcon />}
						</BrightnessPageButton>

						<NavLink>
							<Modal>
								<Modal.Open opens='search'>
									<button
										style={{
											backgroundColor: "#242526",
											border: "none",
										}}>
										<SearchButton />
									</button>
								</Modal.Open>
								<Modal.Window name='search'>
									<SearchContainer />
								</Modal.Window>
							</Modal>
						</NavLink>
					</NaviCon>
					{currentUser ? (
						<div className='drop'>
							<Dropdown
								menu={{ items, selectable: true }}
								placement='bottomRight'
								trigger={["click"]}
								arrow>
								<a onClick={(e) => e.preventDefault()}>
									<HeadPortrait
										src={`http://localhost:80/img/users/${currentUser.photo}`}
										alt='default'
									/>
								</a>
							</Dropdown>
						</div>
					) : (
						<NavLink to='/auth' key='auth'>
							<div style={{ fontSize: "1.5rem" }}>
								<LoginOutlined />
								&nbsp; 登录
							</div>
						</NavLink>
					)}
					{/* {serach && <SearchContainer searchHandler={searchHandler} />} */}
				</NavigationContainer>

				<Outlet />
			</ContainerTow>
		</Fragment>
	);
};

export default Navigation;