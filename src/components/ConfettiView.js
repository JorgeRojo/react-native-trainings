import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'

const MONEY_DIMENSIONS = { width: 50, height: 50 }
const SCREEN_DIMENSIONS = Dimensions.get('window')
const WIGGLE_ROOM = 320

const colors = [
    'rgba(0,0,0, 0.6)',
];

const images = [ 
    require('~/assets/png/behance.png'),
    require('~/assets/png/deviantart.png'),
    require('~/assets/png/dribbble.png'),
    require('~/assets/png/dropbox.png'),
    require('~/assets/png/facebook.png'),
    require('~/assets/png/flickr.png'),
    require('~/assets/png/foursquare.png'),
    require('~/assets/png/google-plus.png'),
    require('~/assets/png/instagram.png'),
    require('~/assets/png/line.png'),
    require('~/assets/png/myspace.png'),
    require('~/assets/png/path.png'),
    require('~/assets/png/pinterest.png'),
    require('~/assets/png/quora.png'),
    require('~/assets/png/skype.png'),
    require('~/assets/png/snapchat.png'),
    require('~/assets/png/soundcloud.png'),
    require('~/assets/png/spotify.png'),
    require('~/assets/png/swarm.png'),
    require('~/assets/png/telegram.png'),
    require('~/assets/png/tumblr.png'),
    require('~/assets/png/twitter.png'),
    require('~/assets/png/viber.png'),
    require('~/assets/png/vimeo.png'),
    require('~/assets/png/vine.png'),
    require('~/assets/png/whatsapp.png'),
    require('~/assets/png/yelp.png'),
    require('~/assets/png/youtube.png'), 
]

const FlippingView = ({ back = false, delay, duration = 5000, style = {}, children = null }) => (
    <Animatable.View
        animation={{
            from: { rotateX: back ? '0deg' : '180deg', rotate: !back ? '180deg' : '0deg' },
            to: { rotateX: back ? '360deg' : '-180deg', rotate: !back ? '180deg' : '0deg' }
        }}
        duration={duration}
        delay={delay}
        easing="linear"
        iterationCount="infinite"
        useNativeDriver
        style={{
            ...style,
            backfaceVisibility: 'hidden'
        }}
    >
        {children}
    </Animatable.View> 
)

const Swinging = ({ amplitude, rotation = 14, delay, duration = 4000, children }) => (
    <Animatable.View
        animation={{
            0: {
                translateX: -amplitude * Math.random() * 4,
                translateY: -amplitude * 0.5,
                rotate: `${rotation}deg`
            },
            0.5: {
                translateX: 0,
                translateY: amplitude * 0.1,
                rotate: '0deg'
            },
            1: {
                translateX: amplitude * Math.random() * 4,
                translateY: -amplitude * 0.5,
                rotate: `${-rotation}deg`
            }
        }}
        delay={delay}
        duration={duration}
        direction="alternate"
        easing="ease-in-out"
        iterationCount="infinite"
        useNativeDriver
    >
        {children}
    </Animatable.View>
)

const Falling = ({ duration, delay, style, children }) => (
    <Animatable.View
        animation={{
            from: { translateY: -MONEY_DIMENSIONS.height - WIGGLE_ROOM },
            to: { translateY: SCREEN_DIMENSIONS.height + WIGGLE_ROOM }
        }}
        duration={duration}
        delay={delay}
        easing={t => Math.pow(t, 1.7)}
        iterationCount="infinite"
        useNativeDriver
        style={style}
    >
        {children}
    </Animatable.View>
)

const randomize = max => Math.random() * max

const range = count => {
    const array = []
    for (let i = 0; i < count; i++) {
        array.push(i)
    }
    return array
}

export default class ConfettiView extends React.Component {
    static propTypes = {
        count: PropTypes.number,
        duration: PropTypes.number
    }

    static defaultProps = {
        count: 160,
        duration: 9400
    }

    render() {
        const { count, duration } = this.props  
        return (
            <View {...this.props} style={[styles.container, this.props.style]}>
                {range(count)
                    .map(i => randomize(1000))
                    .map((flipDelay, i) => { 
                        const showIcon = Math.floor(Math.random() * 15) <= 0 ;
                        const iconSrc = showIcon ? images[Math.floor(Math.random() * (images.length - 1))] : ''; 
                        const size = showIcon ? 48 : Math.random() * 5 + 8
                        const style = {
                            width: size,
                            height: size,
                            backgroundColor: showIcon ? 'transparent' : colors[Math.round(Math.random() * colors.length)],
                            opacity: Math.min(1, Math.random() + 0.5),
                            borderRadius: Math.random() > 0.5 ? 20 : 0
                        }

                        return (
                            <Falling
                                key={i}
                                duration={duration}
                                delay={i * (duration / count)}
                                style={{
                                    position: 'absolute',
                                    zIndex: 10000,
                                    paddingHorizontal: WIGGLE_ROOM,
                                    left: randomize(SCREEN_DIMENSIONS.width - MONEY_DIMENSIONS.width) - WIGGLE_ROOM
                                }}
                            >
                                <Swinging amplitude={MONEY_DIMENSIONS.width / 2} delay={randomize(duration)}>
                                    <FlippingView style={style} delay={flipDelay + i * (duration / count)}>
                                        {showIcon && <Animatable.Image style={styles.icon} source={iconSrc} />} 
                                    </FlippingView>
                                    <FlippingView delay={flipDelay + i * (duration / count)} back style={{ position: 'absolute', ...style }}>
                                        {showIcon && <Animatable.Image style={styles.icon} source={iconSrc} />} 
                                    </FlippingView> 
                                </Swinging>
                            </Falling>
                        )
                    })}
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    icon: {
        width: 48,
        height: 48,
        position: 'absolute',
        left: 0,
        top: 0,
    }
})
