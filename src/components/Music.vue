<template>
    <div>
        <MPlayer :playList="playList" theme="black" />
    </div>
</template>

<script>
import MPlayer from 'vue-mplayer'
export default {
    components: {
        MPlayer,
    },
    data() {
        return {
            playList: [
                {
                    title: '你不像她',
                    author: '南拳妈妈',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=368760&auth=a4ac1f58e396ef5fec910cf5d18df17e1ab4965e',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=109951163244870797&auth=4aae13d0e54ee102a1fd08d8379acbe282f859a2',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=368760&auth=8e31a5af0daaf95e8625ddb18beb171cf20dbefd',
                },
                {
                    title: '这就是街舞3(hls)',
                    author: '优酷',
                    url:
                        'https://douban.donghongzuida.com/20200718/5756_cb5982a3/index.m3u8',
                    pic:
                        'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
                },
                {
                    title: '想见你想见你想见你',
                    author: '八三夭',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=1403215687&auth=0b43ca3de6642a00f378e6d8a2e217c0bc8130e4',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=109951164485238047&auth=878d1376f1851d6547b6ca19b3794790fd4f047a',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=1403215687&auth=85c2616090802838cd289c24ec44d0063798c79c',
                },
                {
                    title: '傻等',
                    author: '夏天Alex',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=30621570&auth=fdb8174d06c08cdf1252abe66614737dd27872ef',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=7739462348125693&auth=7cccda7b4009724bb6aad31fd439f4e776d35356',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=30621570&auth=c69f94dc1cb83c101a104faac3ef82ad9e31e853',
                },
                {
                    title: '起风了',
                    author: '吴青峰',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=1338695683&auth=0d45ce2be0c790618b959ee8cedc3e17db1673f4',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=109951163785600029&auth=b8befb30325465e3c99142f9b6dc671aac27924d',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=1338695683&auth=8541713f674784932ca2dba35c26cad4ec61d748',
                },
                {
                    title: '野孩子',
                    author: '杨千嬅',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=316486&auth=1062a91f4984be54809a64291dd036d0ac8e7eea',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=109951163447787666&auth=dce3deca0aa88111c8a5773af8b78b2d1c10e76a',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=316486&auth=b0fc6a1ee16351b3f0c7061c053fe88d3e41b8c2',
                },
                {
                    title: '有点甜',
                    author: '汪苏泷 / By2',
                    url:
                        'https://api.i-meto.com/meting/api?server=netease&type=url&id=165340&auth=71b724d3d9147bb525937494baabbcaa5664b1fc',
                    pic:
                        'https://api.i-meto.com/meting/api?server=netease&type=pic&id=109951164176658680&auth=ae30a43eb3076ba84c6071673585f4ceac9c1fb0',
                    lrc:
                        'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=165340&auth=588d07a7679aeec889ccf42a3d5d74c36f544b76',
                },
            ],
        }
    },
}
</script>

<style></style>
