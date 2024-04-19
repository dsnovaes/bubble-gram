import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom"
import ProfilePicture from "../ProfilePicture"
import * as sessionActions from '../../store/session';
import Search from '../Search';
import {TbActivityHeartbeat} from "react-icons/tb"
import "./Header.css"

const Header = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = e => {
        e.preventDefault()
        setShowSearch(!showSearch);
    }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        
        history.push("/login");
        dispatch(sessionActions.logout()).then(()=>setTimeout(()=>window.location.reload(),1));

    };

    return (
        <header>
            {showSearch && (
                <Search setShowSearch={setShowSearch} />
            )}
            <div className="insideHeader">
                <h1>
                    <a href="/">
                        <svg className="desktop" width="175" height="37" viewBox="0 0 57 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.008 1.716L1.744 5.388C1.744 5.46 1.732 5.544 1.732 5.616C1.684 6.3 1.636 7.044 1.636 7.644C1.636 7.932 1.648 8.184 1.672 8.388C1.492 8.604 1.384 8.844 1.384 9.108V9.18C1.432 9.744 1.864 10.152 2.44 10.284C2.8 10.356 3.148 10.392 3.496 10.392C4.552 10.392 5.548 10.068 6.4 9.552C7.348 8.976 7.972 8.076 7.972 7.248C7.972 6.576 7.588 5.88 6.712 5.34C6.172 5.016 5.596 4.836 5.032 4.764C5.356 4.632 5.656 4.452 5.908 4.248C6.544 3.744 6.94 3.108 6.94 2.472C6.94 1.944 6.652 1.416 5.92 0.96C5.248 0.539999 4.312 0.431999 3.472 0.431999C3.196 0.431999 2.932 0.443999 2.692 0.456C1.552 0.504 0.544 0.983999 0.232 1.26C0.0399999 1.44 -0.00800008 1.68 -0.00800008 1.884C-0.00800008 2.268 0.196 2.616 0.484 2.712C0.712 2.436 1.3 2.04 2.008 1.716ZM4.804 7.608C4.804 7.512 4.744 7.416 4.648 7.38C4.504 7.308 4.312 7.272 4.108 7.272C3.808 7.272 3.484 7.344 3.196 7.428C3.208 6.756 3.232 6.024 3.268 5.376C3.532 5.328 3.844 5.28 4.168 5.28C4.696 5.28 5.236 5.376 5.776 5.7C6.244 5.976 6.436 6.504 6.436 7.068C6.436 7.728 6.16 8.46 5.716 8.88C5.128 9.432 4.444 9.624 4 9.624C3.58 9.624 3.244 9.468 3.16 9.12C3.148 9.072 3.136 9.012 3.136 8.964C3.136 8.616 3.4 8.292 3.736 8.088C4.06 7.884 4.324 7.848 4.648 7.848C4.732 7.836 4.804 7.68 4.804 7.608ZM3.388 2.88C3.388 2.292 3.34 1.824 3.232 1.5L3.16 1.296C3.52 1.2 3.892 1.14 4.252 1.14C4.576 1.14 4.876 1.188 5.128 1.308C5.452 1.464 5.608 1.848 5.608 2.28C5.608 2.856 5.356 3.552 4.864 3.924C4.204 4.428 3.7 4.656 3.304 4.752C3.34 4.044 3.388 3.42 3.388 2.88ZM9.75503 4.344C9.64703 3.816 9.01103 3.552 8.56703 3.552H8.50703C8.51903 3.636 8.51903 3.732 8.51903 3.828C8.51903 4.08 8.49503 4.404 8.45903 4.752C8.45903 4.8 8.44703 4.86 8.44703 4.908C8.39903 5.46 8.36303 6.072 8.36303 6.636C8.36303 7.008 8.36303 7.368 8.43503 7.704C8.59103 8.448 9.19103 9.348 9.99503 9.348C10.115 9.348 10.247 9.324 10.379 9.276C10.595 9.204 10.763 8.976 10.931 8.628C11.339 7.824 11.651 6.492 11.855 5.808C11.783 6.192 11.711 6.936 11.711 7.5C11.711 7.86 11.771 8.256 11.879 8.592C12.107 9.24 12.635 9.504 13.139 9.504C13.343 9.504 13.547 9.456 13.715 9.384C14.231 9.156 14.723 8.364 14.723 7.98C14.723 7.62 14.483 7.5 14.363 7.5C14.339 7.608 14.195 7.896 13.991 8.184C13.787 8.472 13.511 8.748 13.295 8.748C12.923 8.748 12.923 8.076 12.923 7.776C12.923 7.404 12.947 6.984 12.995 6.468C13.031 5.988 13.079 5.436 13.079 4.968C13.079 4.512 12.767 4.116 12.443 3.864C12.215 3.684 11.975 3.576 11.831 3.576C11.747 3.576 11.699 3.6 11.687 3.672C11.651 3.864 11.567 4.224 11.483 4.596C11.183 5.868 10.655 7.86 10.283 8.148C10.223 8.196 10.175 8.22 10.115 8.22C9.95903 8.22 9.81503 8.052 9.73103 7.704C9.70703 7.62 9.70703 7.476 9.70703 7.296C9.70703 6.684 9.79103 5.64 9.80303 5.136C9.80303 4.812 9.79103 4.536 9.75503 4.344ZM15.7035 1.416C15.7035 0.611999 15.2475 0.288 14.8275 0.288C14.6955 0.288 14.5515 0.323999 14.4555 0.383999C14.1915 2.052 13.8915 4.08 13.8915 5.808C13.8915 6.852 13.9875 7.812 14.3115 8.364C14.7675 9.144 15.5355 9.516 16.1715 9.516C16.6035 9.516 17.0475 9.432 17.3235 9.204C17.9475 8.676 18.2235 7.92 18.3555 6.996C19.0155 6.888 19.5675 6.6 19.8315 6.12C19.9155 5.976 19.9395 5.844 19.9395 5.736C19.9395 5.448 19.7475 5.268 19.6275 5.196C19.5315 5.412 19.3995 5.628 19.1595 5.808C18.9915 5.94 18.7515 6.036 18.4515 6.108C18.4515 5.544 18.3675 5.04 18.2835 4.824C18.0675 4.296 17.7315 3.9 17.3355 3.636C16.9995 3.408 16.5915 3.276 16.2075 3.276C15.9915 3.276 15.7995 3.324 15.6075 3.408C15.6795 2.64 15.7035 1.944 15.7035 1.416ZM17.0835 6.996C16.9635 7.656 16.8195 8.088 16.6875 8.34C16.5075 8.688 16.3155 8.7 16.2795 8.7C16.0515 8.7 15.7875 8.448 15.5835 8.028C15.3915 7.62 15.2475 7.056 15.2475 6.42C15.2475 6.288 15.2475 6.144 15.2595 6.024C15.4395 6.252 15.6675 6.456 15.9555 6.612C16.2315 6.768 16.7955 6.972 17.0835 6.996ZM15.7395 4.788C15.7395 4.332 16.0875 4.152 16.3875 4.152C16.6035 4.152 16.8315 4.248 16.9755 4.44C17.1675 4.704 17.2275 5.172 17.2275 5.568C17.2275 5.784 17.2035 5.976 17.1915 6.12C16.3275 5.928 15.7395 5.364 15.7395 4.788ZM20.8011 1.416C20.8011 0.611999 20.3451 0.288 19.9251 0.288C19.7931 0.288 19.6491 0.323999 19.5531 0.383999C19.2891 2.052 18.9891 4.08 18.9891 5.808C18.9891 6.852 19.0851 7.812 19.4091 8.364C19.8651 9.144 20.6331 9.516 21.2691 9.516C21.7011 9.516 22.1451 9.432 22.4211 9.204C23.0451 8.676 23.3211 7.92 23.4531 6.996C24.1131 6.888 24.6651 6.6 24.9291 6.12C25.0131 5.976 25.0371 5.844 25.0371 5.736C25.0371 5.448 24.8451 5.268 24.7251 5.196C24.6291 5.412 24.4971 5.628 24.2571 5.808C24.0891 5.94 23.8491 6.036 23.5491 6.108C23.5491 5.544 23.4651 5.04 23.3811 4.824C23.1651 4.296 22.8291 3.9 22.4331 3.636C22.0971 3.408 21.6891 3.276 21.3051 3.276C21.0891 3.276 20.8971 3.324 20.7051 3.408C20.7771 2.64 20.8011 1.944 20.8011 1.416ZM22.1811 6.996C22.0611 7.656 21.9171 8.088 21.7851 8.34C21.6051 8.688 21.4131 8.7 21.3771 8.7C21.1491 8.7 20.8851 8.448 20.6811 8.028C20.4891 7.62 20.3451 7.056 20.3451 6.42C20.3451 6.288 20.3451 6.144 20.3571 6.024C20.5371 6.252 20.7651 6.456 21.0531 6.612C21.3291 6.768 21.8931 6.972 22.1811 6.996ZM20.8371 4.788C20.8371 4.332 21.1851 4.152 21.4851 4.152C21.7011 4.152 21.9291 4.248 22.0731 4.44C22.2651 4.704 22.3251 5.172 22.3251 5.568C22.3251 5.784 22.3011 5.976 22.2891 6.12C21.4251 5.928 20.8371 5.364 20.8371 4.788ZM24.1588 5.988C24.2908 7.368 24.4108 8.448 24.7708 8.94C25.0828 9.36 25.5148 9.552 25.9708 9.552C26.1628 9.552 26.3548 9.516 26.5468 9.444C26.8228 9.336 27.2548 8.94 27.4828 8.556C27.5668 8.412 27.6268 8.28 27.6268 8.076C27.6268 7.74 27.4348 7.524 27.3028 7.5C27.2548 7.764 27.0868 8.136 26.8588 8.412C26.6908 8.616 26.4988 8.772 26.3068 8.772C26.2468 8.772 26.1868 8.76 26.1268 8.724C25.7068 8.472 25.6348 7.536 25.6348 6.396V6.096C26.1028 4.8 26.5108 3.588 26.5108 2.388C26.5108 1.752 26.3068 0.983999 25.8748 0.516C25.6348 0.263999 25.3228 0.0959995 24.9388 0.0959995C24.6148 0.0959995 24.3388 0.3 24.2308 0.756C24.0988 1.26 24.0508 2.232 24.0508 3.24C24.0508 4.188 24.0868 5.22 24.1588 5.988ZM25.3348 4.932C25.2508 4.356 25.2028 3.66 25.2028 2.856C25.2028 2.244 25.2388 1.776 25.4668 1.776C25.7068 1.776 25.7908 2.136 25.7908 2.568C25.7908 3.42 25.3348 4.932 25.3348 4.932ZM30.3179 5.784C30.7379 5.448 30.9659 5.052 30.9659 4.62C30.9659 4.428 30.9299 4.236 30.8339 4.044C30.6179 3.564 29.9219 3.204 29.2019 3.204C28.6019 3.204 27.9779 3.456 27.5459 4.092C27.1139 4.716 26.9099 5.58 26.9099 6.42C26.9099 7.248 27.1019 8.052 27.5339 8.592C28.0739 9.276 28.8539 9.516 29.5619 9.516C30.2819 9.516 30.9539 9.24 31.4459 8.784C31.7939 8.46 32.0339 8.052 32.1179 7.584C32.1299 7.536 32.1299 7.488 32.1299 7.44C32.1299 7.128 31.9619 6.888 31.7339 6.888C31.6499 7.392 31.3979 7.86 31.0619 8.196C30.7259 8.532 30.3059 8.736 29.8979 8.736C29.5859 8.736 29.2619 8.604 28.9859 8.304C28.5779 7.884 28.4339 7.14 28.4339 6.372C29.0819 6.372 29.8019 6.192 30.3179 5.784ZM29.4179 3.804C29.6699 3.804 29.8859 4.116 29.8859 4.452C29.8859 4.776 29.6939 5.208 29.3339 5.46C29.0339 5.652 28.7579 5.748 28.4579 5.808C28.5659 4.848 28.9499 3.804 29.4179 3.804ZM34.4984 10.824C34.3544 11.064 34.0784 11.16 33.8504 11.16C33.6224 11.16 33.4304 11.076 33.4304 10.944C33.4304 10.848 33.5744 10.74 33.6464 10.692C33.8384 10.548 34.5704 10.2 34.7504 10.128C34.6904 10.38 34.6184 10.608 34.4984 10.824ZM33.3224 8.436C33.0824 8.436 32.9024 8.04 32.9024 7.212C32.9024 6.972 32.9144 6.696 32.9504 6.384C33.0704 5.4 33.5024 4.128 34.0304 4.128C34.3904 4.128 34.7624 4.548 34.8344 5.076C34.6424 5.772 34.4384 6.504 34.1624 7.116C33.8384 7.812 33.5504 8.436 33.3224 8.436ZM34.8104 9.336C34.8104 9.336 34.2224 9.648 33.8504 9.828C33.2984 10.092 32.6864 10.392 32.4344 10.788C32.3624 10.92 32.3144 11.052 32.3144 11.184C32.3144 11.844 33.2864 11.976 33.7184 11.976C34.3544 11.976 35.0624 11.76 35.4464 11.304C35.8424 10.836 36.0344 10.128 36.1184 9.456C36.7304 9.132 37.2824 8.76 37.5824 8.352C37.7024 8.184 37.7624 8.016 37.7624 7.896C37.7624 7.644 37.5944 7.476 37.4624 7.404C37.3304 7.584 37.1384 7.788 36.8984 7.98C36.6944 8.148 36.4544 8.328 36.2024 8.508C36.2024 8.364 36.2624 6.792 36.2984 6.132C36.3464 5.28 36.2984 4.908 36.3704 4.416C36.3704 4.332 36.3584 4.272 36.3224 4.2C36.1424 3.888 35.6144 3.684 35.2664 3.684C35.1344 3.684 35.0264 3.708 35.0144 3.768C35.0024 3.888 34.9784 4.032 34.9424 4.164C34.6424 3.612 34.0544 3.36 33.6464 3.36C32.9144 3.36 32.3144 3.792 31.9184 4.416C31.5464 5.028 31.3424 5.808 31.3424 6.6C31.3424 7.044 31.4144 7.488 31.5344 7.896C31.7144 8.472 31.9784 8.88 32.2784 9.144C32.5304 9.36 32.7944 9.468 33.0584 9.468C33.4064 9.468 33.6584 9.264 33.8504 9.024C34.2944 8.472 34.6544 7.464 34.9544 6.552C34.9544 6.78 34.8344 7.536 34.8344 8.112C34.8344 8.736 34.8104 9.108 34.8104 9.336ZM38.5011 8.028C38.5011 7.716 38.6211 7.248 38.7891 6.816C38.9211 6.468 39.0771 6.132 39.2331 5.88C39.5571 6.372 40.1451 6.696 40.8171 6.696C41.5011 6.696 42.0651 6.324 42.0651 5.712C42.0651 5.424 41.9331 5.244 41.7291 5.22C41.6331 5.604 41.2731 5.94 40.8891 5.94C40.8531 5.94 40.8051 5.94 40.7691 5.928C40.1931 5.808 39.9771 5.184 39.9771 5.184C39.9771 5.184 40.4691 4.62 40.4691 4.296C40.4691 3.816 39.9531 3.408 39.5691 3.408C39.4731 3.408 39.3891 3.432 39.3171 3.492C39.1371 3.636 39.0051 3.9 38.9211 4.248C38.8851 4.404 38.8731 4.56 38.8731 4.68C38.8731 4.764 38.8851 4.86 38.8971 4.944C38.7771 5.172 38.6451 5.508 38.5371 5.868V5.4C38.5371 4.896 38.5131 4.404 38.2731 4.044C38.0811 3.732 37.7691 3.516 37.4211 3.516C37.3371 3.516 37.2531 3.528 37.1691 3.552C37.1931 3.684 37.2171 3.876 37.2171 4.128C37.2171 4.404 37.2051 4.752 37.1931 5.136C37.1811 5.604 37.1691 6.264 37.1691 6.756C37.1691 7.632 37.2171 8.46 37.3611 8.82C37.4811 9.144 37.8891 9.468 38.2731 9.468C38.3691 9.468 38.4651 9.456 38.5491 9.408C38.5131 8.94 38.5011 8.52 38.5011 8.028ZM46.0498 8.712C45.8698 8.628 45.8098 8.196 45.8098 7.632C45.8098 6.936 45.8938 6.012 45.9658 5.328C46.0018 4.968 46.0258 4.668 46.0258 4.548C46.0138 4.02 45.3418 3.588 44.9698 3.588C44.8378 3.588 44.7538 3.648 44.7418 3.768C44.7298 3.948 44.7178 4.068 44.6938 4.2C44.3338 3.684 43.7578 3.396 43.1698 3.396C42.9538 3.396 42.7378 3.432 42.5338 3.516C41.5378 3.912 41.0458 5.388 41.0458 6.612V6.744C41.0698 7.512 41.2858 8.244 41.6098 8.748C41.8978 9.204 42.2938 9.48 42.7018 9.48C42.7978 9.48 42.9058 9.468 43.0138 9.432C43.7698 9.168 44.3458 7.476 44.5138 6.9C44.5138 6.948 44.5018 6.996 44.5018 7.044C44.4898 7.236 44.4778 7.392 44.4778 7.548C44.4778 7.848 44.5138 8.148 44.6218 8.628C44.6698 8.832 44.8258 9.024 45.0178 9.168C45.2698 9.36 45.6778 9.516 45.9658 9.516C46.7098 9.516 47.3098 8.868 47.5138 8.268C47.5378 8.172 47.5498 8.088 47.5498 8.004C47.5498 7.692 47.3818 7.536 47.2498 7.5C47.1418 7.908 46.6498 8.76 46.2178 8.76C46.1578 8.76 46.1098 8.736 46.0498 8.712ZM42.9298 8.424C42.7498 8.424 42.5818 7.848 42.5818 7.236C42.5818 6.252 42.8698 4.872 43.3618 4.356C43.5058 4.212 43.6498 4.152 43.7818 4.152C44.1778 4.152 44.4898 4.692 44.5258 5.076C44.3098 6.048 43.9258 7.152 43.5418 7.812C43.3258 8.184 43.1098 8.424 42.9298 8.424ZM54.9823 9.516C55.4383 9.384 56.0623 8.808 56.2303 8.22C56.2543 8.124 56.2663 8.04 56.2663 7.956C56.2663 7.656 56.0983 7.488 55.9663 7.464C55.9063 7.68 55.6903 8.112 55.4383 8.424C55.2703 8.628 55.0903 8.772 54.9103 8.772C54.8383 8.772 54.7783 8.76 54.7183 8.712C54.5503 8.604 54.5143 8.196 54.5143 7.752C54.5143 7.284 54.5623 6.768 54.5743 6.528C54.5983 6.132 54.6343 5.748 54.6343 5.388C54.6343 5.124 54.6103 4.884 54.5503 4.656C54.3103 3.864 53.6503 3.588 53.1463 3.588C52.6063 3.588 52.2343 4.104 52.0303 4.656C51.8023 5.256 51.5503 5.832 51.3463 6.648C51.3583 6.288 51.3703 6.036 51.3703 5.772C51.3703 5.328 51.3343 4.872 51.1663 4.464C50.9743 3.996 50.4583 3.6 49.9303 3.6C49.2223 3.6 48.9823 4.26 48.7783 4.788C48.4543 5.616 48.2023 6.648 48.1663 6.816C48.2503 5.424 48.2503 5.304 48.2503 5.196C48.2503 4.74 48.1903 4.404 48.1183 4.248C47.9503 3.888 47.5303 3.708 47.1823 3.708C47.0983 3.708 47.0143 3.72 46.9423 3.744C46.9903 4.02 47.0023 4.272 47.0023 4.524C47.0023 5.028 46.9423 5.52 46.9063 6.18C46.8703 6.696 46.8463 7.368 46.8463 7.908C46.8463 8.184 46.8583 8.424 46.8703 8.592C46.9063 9.048 47.5783 9.384 47.9983 9.384C48.0823 9.384 48.1423 9.372 48.2023 9.348C48.2023 8.868 48.4543 7.764 48.7663 6.732C49.1143 5.592 49.5343 4.548 49.7863 4.548C50.0383 4.548 50.0863 5.172 50.0863 5.904C50.0863 6.168 50.0863 6.456 50.0743 6.72C50.0503 7.416 49.9663 7.992 49.9663 8.412C49.9663 8.556 49.9783 8.676 50.0023 8.784C50.1103 9.192 50.5183 9.36 50.9023 9.36C51.0463 9.36 51.1783 9.336 51.2983 9.3V9.228C51.2983 8.808 51.5743 7.692 51.9103 6.648C52.1383 5.928 52.4023 5.256 52.6303 4.86C52.7503 4.644 52.8703 4.524 52.9543 4.524C53.0863 4.524 53.1583 4.668 53.2063 4.848C53.2663 5.076 53.2663 5.34 53.2663 5.436C53.2663 6.084 53.1943 6.672 53.1943 7.26C53.1943 7.656 53.2303 8.028 53.3263 8.4C53.5063 9.084 54.1423 9.552 54.7183 9.552C54.8143 9.552 54.8983 9.54 54.9823 9.516Z" fill="currentColor"/></svg>
                        <svg aria-label="Instagram" className="mobile" color="#fafafa" fill="#fafafa" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path></svg>
                    </a>
                </h1>
                <nav>
                    <ul>
                        <li><NavLink to="/"><svg aria-label="Home" className="_ab6-" color="#fafafa" fill="#fafafa" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg> <span>Home</span></NavLink></li>
                        <li><NavLink to="/search" onClick={toggleSearch}><svg aria-label="Search" color="#fafafa" fill="#fafafa" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg> <span>Search</span></NavLink></li>
                        <li><NavLink to="/posts"><svg aria-label="Explore" color="#fafafa" fill="#fafafa" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon><polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg> <span>Explore</span></NavLink></li>
                        <li><NavLink to="/create"><svg aria-label="New post" color="#fafafa" fill="#fafafa" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg> <span>Create</span></NavLink></li>
                        <li><NavLink to={`/users/${sessionUser.username}`}><ProfilePicture user={sessionUser} /> <span>Profile</span></NavLink></li>
                        {sessionUser.username === "dsnovaes" && (
                            <li><NavLink to="/activity"><TbActivityHeartbeat /><span>Activity</span></NavLink></li>
                        )}
                    </ul>
                </nav>
                    <nav>
                        <ul>
                            <li className="github"><a href="https://github.com/dsnovaes/bubble-gram" title="Github" target="_blank">
                                <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 0C13.0302 0 11.0796 0.387987 9.25975 1.14181C7.43986 1.89563 5.78628 3.00052 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 21.63 4.305 27.255 10.26 29.25C11.01 29.37 11.25 28.905 11.25 28.5V25.965C7.095 26.865 6.21 23.955 6.21 23.955C5.52 22.215 4.545 21.75 4.545 21.75C3.18 20.82 4.65 20.85 4.65 20.85C6.15 20.955 6.945 22.395 6.945 22.395C8.25 24.675 10.455 24 11.31 23.64C11.445 22.665 11.835 22.005 12.255 21.63C8.925 21.255 5.43 19.965 5.43 14.25C5.43 12.585 6 11.25 6.975 10.185C6.825 9.81 6.3 8.25 7.125 6.225C7.125 6.225 8.385 5.82 11.25 7.755C12.435 7.425 13.725 7.26 15 7.26C16.275 7.26 17.565 7.425 18.75 7.755C21.615 5.82 22.875 6.225 22.875 6.225C23.7 8.25 23.175 9.81 23.025 10.185C24 11.25 24.57 12.585 24.57 14.25C24.57 19.98 21.06 21.24 17.715 21.615C18.255 22.08 18.75 22.995 18.75 24.39V28.5C18.75 28.905 18.99 29.385 19.755 29.25C25.71 27.24 30 21.63 30 15C30 13.0302 29.612 11.0796 28.8582 9.25975C28.1044 7.43986 26.9995 5.78628 25.6066 4.3934C24.2137 3.00052 22.5601 1.89563 20.7403 1.14181C18.9204 0.387987 16.9698 0 15 0Z" fill="currentColor"/>
                            </svg><span>About this project on Github</span></a></li>

                            <li className="linkedin"><a href="https://www.linkedin.com/in/diegonovaes/" title="LinkedIn" target="_blank">
                            <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.7217 20.5H9.055V11.835H11.7217V20.5ZM10.3883 10.7233C9.42667 10.7233 8.945 10.2783 8.945 9.39C8.94202 9.21173 8.97772 9.03493 9.04965 8.87179C9.12159 8.70864 9.22804 8.56304 9.36167 8.445C9.63958 8.18571 10.0084 8.04621 10.3883 8.05667C11.35 8.05667 11.8317 8.50333 11.8317 9.39167C11.8317 10.28 11.3517 10.7233 10.3883 10.7233ZM21.6117 20.5H18.89V15.6667C18.89 14.4083 18.4433 13.7783 17.555 13.7783C16.8517 13.7783 16.39 14.13 16.165 14.8333C16.0933 14.945 16.055 15.1683 16.055 15.5V20.5H13.3333V14.6117C13.3333 13.2783 13.3133 12.3533 13.2783 11.835H15.6117L15.7783 13C16.39 12.0733 17.2783 11.6117 18.5 11.6117C19.4283 11.6117 20.1767 11.935 20.75 12.5833C21.3267 13.2317 21.6133 14.1667 21.6133 15.39V20.5H21.6117ZM15 30C6.72833 30 0 23.2717 0 15C0 6.72833 6.72833 0 15 0C23.2717 0 30 6.72833 30 15C30 23.2717 23.2717 30 15 30ZM15 3.33333C8.56833 3.33333 3.33333 8.56833 3.33333 15C3.33333 21.4317 8.56833 26.6667 15 26.6667C21.4317 26.6667 26.6667 21.4317 26.6667 15C26.6667 8.56833 21.4317 3.33333 15 3.33333Z" fill="currentColor"/>
                            </svg> <span>LinkedIn of Diego Novaes</span></a></li>
                        </ul>
                    <button className="more" onClick={openMenu}><svg aria-label="Settings" color="#fafafa" fill="#fafafa" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line></svg> <span>More</span></button>
                    </nav>
                {showMenu && (
                    <div className="morePopOver">
                        <ul>
                            <li>
                                <NavLink to="/settings">Settings</NavLink>
                            </li>
                            <li>
                                <NavLink to="/logout" onClick={logout}>Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    )
}
export default Header