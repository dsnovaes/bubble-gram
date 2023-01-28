const ProfilePicture = ({user}) => {

    if (user.profilePictureUrl) {
        
        return (
            <img src={user.profilePictureUrl} loading="lazy" alt={user.name} />
        )
    } else {
        return (
            <svg width="24" height="24" viewBox="0 0 300 300" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M150 0C120.333 0 91.3319 8.79735 66.6645 25.2796C41.9972 41.7618 22.7713 65.1886 11.4181 92.5975C0.0649929 120.006 -2.90551 150.166 2.88227 179.263C8.67006 208.361 22.9562 235.088 43.934 256.066C64.9119 277.044 91.6393 291.33 120.736 297.118C149.834 302.906 179.994 299.935 207.403 288.582C234.811 277.229 258.238 258.003 274.72 233.335C291.203 208.668 300 179.667 300 150C300 110.217 284.196 72.0644 256.066 43.934C227.936 15.8035 189.782 0 150 0ZM227.417 255C205.039 271.652 177.889 280.646 149.996 280.646C122.102 280.646 94.9523 271.652 72.575 255V246.775C72.5839 236.512 76.6649 226.671 83.9222 219.414C91.1795 212.156 101.02 208.075 111.283 208.067C118 208.067 127.95 214.958 149.992 214.958C172.033 214.958 181.925 208.067 188.7 208.067C198.963 208.075 208.804 212.156 216.061 219.414C223.318 226.671 227.4 236.512 227.408 246.775L227.417 255ZM245.925 238.333C243.95 224.561 237.079 211.961 226.571 202.841C216.063 193.721 202.622 188.692 188.708 188.675C176.308 188.675 170.325 195.567 150 195.567C129.675 195.567 123.75 188.675 111.292 188.675C97.3783 188.692 83.9368 193.721 73.4289 202.841C62.9211 211.961 56.0504 224.561 54.0751 238.333C36.8312 219.681 25.3993 196.405 21.1786 171.356C16.9578 146.307 20.1314 120.571 30.3107 97.2975C40.4901 74.0241 57.2337 54.2232 78.4923 40.3183C99.7508 26.4134 124.602 19.0077 150.004 19.0077C175.406 19.0077 200.258 26.4134 221.516 40.3183C242.775 54.2232 259.518 74.0241 269.698 97.2975C279.877 120.571 283.051 146.307 278.83 171.356C274.609 196.405 263.177 219.681 245.933 238.333H245.925ZM150 67.7416C139.473 67.7416 129.183 70.8632 120.43 76.7117C111.677 82.5601 104.855 90.8727 100.827 100.598C96.7981 110.324 95.744 121.026 97.7977 131.35C99.8514 141.675 104.921 151.159 112.364 158.602C119.808 166.046 129.292 171.115 139.616 173.169C149.941 175.223 160.643 174.169 170.368 170.14C180.094 166.112 188.407 159.29 194.255 150.537C200.103 141.784 203.225 131.494 203.225 120.967C203.225 106.85 197.617 93.3125 187.636 83.3309C177.654 73.3493 164.116 67.7416 150 67.7416ZM150 154.842C143.3 154.842 136.751 152.855 131.18 149.133C125.609 145.41 121.268 140.12 118.704 133.93C116.14 127.74 115.469 120.929 116.776 114.358C118.083 107.787 121.309 101.751 126.047 97.0134C130.784 92.2759 136.82 89.0496 143.391 87.7425C149.962 86.4355 156.774 87.1063 162.963 89.6702C169.153 92.2341 174.444 96.576 178.166 102.147C181.888 107.717 183.875 114.267 183.875 120.967C183.871 129.949 180.3 138.563 173.948 144.915C167.597 151.267 158.983 154.837 150 154.842Z" fill="currentColor"/>
            </svg>
        )
    }
}
export default ProfilePicture