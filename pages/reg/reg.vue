<template>
<view class="container">
    <view class="avatar">
        <image src="../../static/img/avatar_default.png" mode=""></image>
        <view style="font-size: 16px"> 请注册 </view>
    </view>
    <view class="pinput">
        <view class="info">
            <view style="font-size: 28rpx; width: 70px">用户名称：</view>
            <input class="uni-input" :value="username" @input="inputChange1" focus placeholder="请输入账号" />
        </view>
        <view class="info">
            <view style="font-size: 28rpx; width: 70px">用户密码：</view>
            <input class="uni-input" :value="password1" @input="inputChange2" type="password" placeholder="请输入密码" />
        </view>
        <view class="info">
            <view style="font-size: 28rpx; width: 70px">确认密码：</view>
            <input class="uni-input" :value="password2" @input="inputChange3" type="password" placeholder="请再次输入密码" />
        </view>
        <view class="info">
            <view style="font-size: 28rpx; width: 70px">手机号码：</view>
            <input class="uni-input" :value="phone" @input="inputChange4" placeholder="请输入手机号码" />
        </view>
        <view class="info">
            <view style="font-size: 28rpx; width: 70px">验证码：</view>
            <input class="uni-input codeInput" :value="code" @input="inputChange5" placeholder="验证码" />
            <button class="codeBtn" type="primary" size="mini" :disabled="disabled" @click="getCode">
                {{ text }}
            </button>
        </view>
    </view>
    <view class="protocol">
        <radio class="check_pro" value="" :checked="ifCheck" @click="radioChange" />
        <span class="span_pro">我已阅读并同意此协议</span>
        <span class="click_pro" @click="showPro">用户协议</span>
    </view>
    <button @click="login" class="btn" type="default" :disabled="!ifCheck">
        立即注册
    </button>

    <view class="dialog" @click="show_log" v-if="showDialog">
        <scroll-view class="protocol_info" scroll-y="true">
            <h3>浪博科技用户注册协议</h3>
            <view class="pop_view">
                在此特别提醒您在注册成为浪博科技用户之前,请认真阅读本《浪博科技用户注册协议》(以下简称“协议”),确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。您同意并点击确认本协议条款且完成注册程序后,才能成为浪博科技的正式注册用户,并享受浪博科技的各类服务。您的注册、登录、使用等行为将视为对本协议的接受,并同意接受本协议各项条款的约束。若您不同意本协议,或对本协议中的条款存在任何疑问,请您立即停止浪博科技用户注册程序,并可以选择不使用浪博科技服务。本协议条款是浪博科技公司（以下称“浪博科技”或“我们”）对用户相关政策的许诺,请您务必仔细阅读。
            </view>
            <view class="pop_view"> 1. 用户信息采集 </view>
            <view class="pop_view">
                当您在本网站/软件进行用户注册登记，使用本网站/软件的服务，以及参加本网站/软件的活动时，即为您同意本网站/软件将收集您的个人信息，并保存记录。本网站/软件收集的个人信息包括但不限于：姓名、性别、生日、城市、身份证号码、电子邮箱地址、手机电话、血型，收货地址等。您主动提供的信息越多及越准确，我们就能够更好地为您提供有关服务。
            </view>
            <view class="pop_view"> 2. 用户信息的使用 </view>
            <view class="pop_view">
                本网站/软件收集个人信息的基本目的是为了更好的了解我们的用户，以便向您提供特色服务和个性化服务。个人信息将主要用于以下几个目的：
            </view>
            <view class="pop_view"> (1) 完成您对特定服务或产品的要求。 </view>
            <view class="pop_view">
                (2)
                在我们提供服务时,用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途,确保我们向您提供的产品和服务的安全性。
            </view>
            <view class="pop_view"> (3)帮助我们设计新服务,改善我们现有服务。 </view>
            <view class="pop_view">
                (4)使我们更加了解您如何接入和使用我们的服务,从而针对性地回应您的个性化需求,例如语言设定、位置设定、个性化的帮助服务和指示,或对您和其他用户作出其他方面的回应。
            </view>
            <view class="pop_view">
                (5)用于对本网站/软件用户数据的统计（如用户数量、构成、兴趣、表现等），以便我们向用户提供更好的服务和产品，或向第三方为了一定的合法目的披露该类统计数据。该类统计数据都是用户群整体的信息，而非个人的信息。
            </view>
            <view class="pop_view">
                (6)让您参与有关我们产品和服务的调查。为了让您有更好的体验、改善我们的服务或您同意的其他用途,在符合相关法律法规的前提下,我们可能将通过某一项服务所收集的信息,以汇集信息或者个性化的方式,用于我们的其他服务。例如,在您使用我们的一项服务时所收集的信息,可能在另一服务中用于向您提供特定内容,或向您展示与您相关的、非普遍推送的信息。如果我们在相关服务中提供了相应选项,您也可以授权我们将该服务所提供和储存的信息用于我们的其他服务。
            </view>
            <view class="pop_view"> 3. 用户信息的共享和披露 </view>
            <view class="pop_view">
                浪博科技信息所收集您的个人信息，将仅用于浪博科技为您提供相关服务。一般情况下，在未得到您的同意之前，您的任何个人信息将不会被提供给无关的第三方。
            </view>
            <view class="pop_view">
                在下列情况下，我们可能会将您的个人信息提供给有关的第三方：
            </view>
            <view class="pop_view">
                (1)本网站/软件的某些服务需由一个合作伙伴(如代理公司、提供相关技术服务的公司、运输公司、邮寄公司、提供奖品的公司等)提供或共同提供。为了向您提供此类服务，本网站有必要与该合作伙伴分享您的个人信息。如果您不希望您的信息被分享，您可以不使用该具体服务从而拒绝您的个人信息被披露。
            </view>
            <view class="pop_view">
                (2)本网站/软件可能会与第三方共同进行推广活动。在推广活动中所收集的全部或部分个人信息可能会与该第三方分享。如果您不想让您的信息被分享，您可以通过不参加该推广活动而拒绝。
            </view>
            <view class="pop_view">
                (3)根据法律法规或政府的强制性规定，我们必须向有关司法或政府部门提供您的个人信息。
            </view>
            <view class="pop_view">
                (4)为了防止他人的合法权益或社会公共利益受到重大危害。
            </view>
            <view class="pop_view"> (5)为了防止您的合法权益受到重大危害。 </view>
            <view class="pop_view">
                (6)我们发现您的行为违反了本网站/软件的服务条款或关于特定服务或产品的任何使用指引，
                或对浪博科技信息的合法权益构成重大危害。
            </view>
            <view class="pop_view"> 4. 用户管理 </view>
            <view class="pop_view">
                您可以在任何时候通过使用您的本网站/软件的注册用户名和密码，查询，补充或更正您的本网站/软件帐户中的个人信息，或要求删除您的本网站/软件帐户中的个人信息。您在本网站/软件的帐户可以被删除，但这样会导致您不能够登录本网站/软件及使用本网站/软件的任何服务。若发现任何非法使用用户帐号或存在安全漏洞的情况,请立即通知本站并向公安机关报案。因用户未妥善保管其帐号名称及密码而导致第三人使用帐号而给用户造成的损失,由用户自行承担
            </view>
            <view class="pop_view">
                用户在注册及使用时应承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性等七条底线,且用户对其发布的内容(包括但不限于文字、图片等)时,不得有以下情形：
            </view>
            <view class="pop_view"> (1)违反宪法或法律法规规定的; </view>
            <view class="pop_view">
                (2)危害国家安全,泄露国家秘密,颠覆国家政权,破坏国家统一的;
            </view>
            <view class="pop_view"> (3)损害国家荣誉和利益的,损害公共利益的; </view>
            <view class="pop_view"> 煽动民族仇恨、民族歧视,破坏民族团结的; </view>
            <view class="pop_view">
                (5)破坏国家宗教政策,宣扬邪教和封建迷信的;
            </view>
            <view class="pop_view"> (6)散布谣言,扰乱社会秩序,破坏社会稳定的; </view>
            <view class="pop_view">
                (7)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的
            </view>
            <view class="pop_view"> (8)侮辱或者诽谤他人,侵害他人合法权益的; </view>
            <view class="pop_view">
                (9)含有法律、行政法规禁止的其他内容或违反浪博科技的其他规定的。
            </view>
            <view class="pop_view">
                用户以虚假信息骗取帐号名称注册,或其帐号头像、简介等注册信息存在违法和不良信息的,浪博科技有权采取通知限期改正、暂停使用、注销登记等措施。浪博科技帐号仅限于用户本人使用,严禁将您的浪博科技帐号允许第三人使用,否则用户应承担由此产生的全部责任,并与实际使用人承担连带责任
            </view>
            <view class="pop_view"> 5. 信息安全 </view>
            <view class="pop_view">
                您的本网站/软件帐户信息和本网站/软件档案通过密码来保护，只有您个人才有权获取这些个人信息。我们建议您不要向任何他人泄露您的密码。本网站/软件也不会主动致电或主动发电子邮件给您来询问您的密码，如果您遇到此类情况请及时与浪博科技客服联系确认。同时，请您在完成工作后，务必退出您的本网站/软件帐户并关闭您的浏览器窗口，以便当您与他人合用一台电脑，或正在公共场所使用电脑时，保证他人无法获取您的个人信息和往来通信。遗憾的是，任何通过互联网或无线网络的数据传输都无法获得绝对的安全保证。所以，在我们尽最大努力来保护您的个人信息的同时，本网站/软件不能对您向我们进行的信息传输，或我们所发的在线产品或服务的信息的安全作出肯定或保证。您作出上述行为时将自己承担风险。一旦我们收到您传输来的信息，我们将尽最大努力保证其在我们系统的安全。
            </view>
            <view class="pop_view"> 6. 用户隐私制度 </view>
            <view class="pop_view">
                我们会在您自愿的前提下收集您的个人信息并将这些信息进行整合,包括但不限于注册
                帐号时的相关信息和活动报名信息等。尊重用户个人隐私是浪博科技的一项基本政策。所以,浪博科技不会公开或向任何第三方透露用户的注册资料以及用户因享受浪博科技服务而提供的任何信息,但以下情形除外:
            </view>
            <view class="pop_view"> (1)事先获得用户的明确授权或许可; </view>
            <view class="pop_view">
                (2)遵守有关法律规定,包括在国家有关机关查询时,提供用户的注册信息、用户在本站发布的信息内容及其发布时间、互联网地址或者域名等
            </view>
            <view class="pop_view">
                (3)在紧急情况下竭力维护用户个人和社会大众的隐私安全;
            </view>
            <view class="pop_view">
                (4)根据本条款相关规定或者浪博科技认为必要的其他情形。浪博科技可能会与第三方合作向用户提供相关的网络服务,在此情况下,如该第三方同意承担与浪博科技同等的保护用户隐私的责任,则浪博科技可将用户信息提供给该第三方。
            </view>
            <view class="pop_view"> 7. 所有权及知识产权条款 </view>
            <view class="pop_view">
                本“网站/软件”由浪博科技拥有和运作。本“网站/软件”公开或显示的所有内容，包括但不限于文字、图表、照片、图像、动画、音效、插图及软件（简称“内容”）等，均属浪博科技及其许可人或内容供应商所有。本“网站/软件”内的所有组成要素，包括但不限于整体设计及“内容”，均受商业外观、版权、道德规范、商标及其它所有相关知识产权的法律保护。除非依据本条款与条件或与经浪博科技在其它协议的声明同意外，本网站/软件內的任何部分或组成要素或“內容”均不得以任何方式复制或传播。除非有明确协议同意，否则网站/软件中的“內容”及一切相关权利将为浪博科技成员或其许可人的资产。
            </view>
            <view class="pop_view"> 8. 责任限制 </view>
            <view class="pop_view">
                除非另有明确的书面说明,本站及其所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品(包括软件)和服务,均是在"按现状"和"按现有"的基础上提供的。
                除非另有明确的书面说明,我们不对本站的运营及其包含在本站上的信息、内容、材料、产品(包括软件)或服务作任何形式的、明示或默示的声明或担保(根据中华人民共和国法律
                另有规定的以外)。我们不担保本站所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品(包括软件)和服务、其服务器或从本站发出的电子信件、信息没有病毒或其他有害成分。如因不可抗力或其它本站无法控制的原因使本站服务系统溃或无法正常使用导致服务不可用或网上交易无法完成或丢失有关的信息、记录等,我们会合理地尽力协助处理善后事宜
            </view>
            <view class="pop_view"> 9. 免责声明 </view>
            <view class="pop_view">
                客户明确同意使用浪博科技服务的风险由客户承担。浪博科技明确表示不提供任何类型的担保，不论是明确的或隐含的。浪博科技将尽力维护客户使用浪博科技服务的合法权益，但不担保浪博科技服务一定能满足客户的要求，也不担保服务的及时性、安全性、真实性、稳定性、正确性。对客户使用该等服务中出现的信息（包括但不限于客户发布的信息）删除或储存失败，浪博科技亦不承担任何责任。
                客户理解并接受下载或通过相应产品服务取得的任何信息资料取决于客户自己，并自行承担系统受损、资料丢失以及其他任何风险。浪博科技对客户在互联网上得到的任何商品购物服务、交易进程、招聘信息等，都不作担保。
                浪博科技对直接、间接、偶然、特殊及继起的损害不负责任，这些损害来自：不正当使用浪博科技服务及/或应用服务，在网上购买商品或类似服务，在网上进行交易，非法使用服务或客户传送的信息有所变动。
                浪博科技对本项服务下涉及的境内外基础运营商的通信网络的故障、技术缺陷、覆盖范围限制、不可抗力、计算机病毒、黑客攻击、客户所在位置、客户关机或其他非浪博科技技术能力范围内的事因等造成的服务中断、客户邮件内容丢失、出现乱码、错误接收、无法接收、迟延接收不承担责任。
                浪博科技保留判定客户的行为是否符合本服务协议要求的权利，如果客户违背了本服务协议的规定，浪博科技有权中止或终止相应浪博科技服务。
                转户规定：如果客户将手机号码转让给他人，请用户提前自行删除浪博科技内资料。否则，受让该号码的客户将能够查看您的客户个人数据。浪博科技不承担由此引发的客户数据丢失等责任及纠纷。
            </view>
            <view class="pop_view"> 10. 协议更新及用户关注义务 </view>
            <view class="pop_view">
                根据国家法律法规的更新及网站运营需要,我们有权对本条款不时地进行修改,修改后的服务条款一旦被张贴在本站上即生效力,并代替原来的服务条款。用户可随时登录查阅最新服务
                条款内容。如用户不同意更新后的服务条款,应立即停止接受本站提供的服务;如用户继续使用本站提供的服务,即视为同意更新后的用户协议。我们建议您在使用本站之前阅读本用户
                协议及本站的公告。如果本用户协议中任何一条被视为废止无效或因任何理由不可执行,该条应视为可分的且并不影响任何其余协议的有效性和可执行性。
            </view>
            <view class="pop_view"> 11. 法律管辖和适用 </view>
            <view class="pop_view">
                本用户协议的订立、执行和解释及争议的解决均应适用在中华人民共和国大陆地区现行之有效法律。如发生本服务条款的某些内容与适用之法律相抵触时,则这些条款将完全按法律规定重新解释,而其它有效条款继续有效。如缔约方就本条款內容或其执行发生任何争议,双方应尽力友好协商解决;协商不成时,任何一方均可向咕咚所在地的中华人民共和国大陆地区法院提起诉讼。
            </view>
            <view class="pop_view"> 12. 其他 </view>
            <view class="pop_view">
                我们尊重用户和消费者的合法权利,本用户协议及本站上发布的各类规则、政策、声明等其他内容,均是为了更好的、更加便利的为用户和消费者提供服务。浪博科技欢迎用户和社会各界提出意见和建议,我们将虚心接受并适时修改本服务条款及相关政策、规则。
            </view>
            <view class="pop_view">
                您完成注册且成为浪博科技的注册用户则意味着您完全接受本用户协议,在注册之前请您再次确认已知悉并完全理解本用户协议的全部内容。
            </view>
        </scroll-view>
    </view>
    <!-- <uni-popup ref="popup" type="center"> -->

    <!-- </uni-popup> -->
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
export default {
    data() {
        return {
            username: "",
            password1: "",
            password2: "",
            phone: "",
            code: "",
            disabled: false,
            text: "获取验证码",
            num: 60,
            ifCheck: false,
            showDialog: false,
        };
    },
    methods: {
        inputChange1(e) {
            this.username = e.detail.value;
        },
        inputChange2(e) {
            this.password1 = e.detail.value;
        },
        inputChange3(e) {
            this.password2 = e.detail.value;
        },
        inputChange4(e) {
            this.phone = e.detail.value;
        },
        inputChange5(e) {
            this.code = e.detail.value;
        },
        login() {
            var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;

            if (this.username == "") {
                uni.showToast({
                    title: "用户名不能为空",
                    duration: 2000,
                    icon: "none",
                });
                return;
            }
            if (this.password1 == "") {
                uni.showToast({
                    icon: "none",
                    title: "密码不能为空",
                    duration: 1500,
                });
                return;
            }
            if (this.password2 == "") {
                uni.showToast({
                    icon: "none",
                    title: "请确认密码",
                    duration: 1500,
                });
                return;
            }
            if (this.password1 != this.password2) {
                uni.showToast({
                    icon: "none",
                    title: "两次密码不一致",
                    duration: 1500,
                });
                return;
            }
            if (!reg.test(this.phone)) {
                uni.showToast({
                    icon: "none",
                    title: "手机号码输入有误",
                    duration: 1500,
                });
                return false;
            }
            if (!this.code) {
                uni.showToast({
                    icon: "none",
                    title: "请输入验证码",
                    duration: 1500,
                });
                return;
            }
            let data = {
                username: this.username,
                password: this.password1,
                mobile: this.phone,
                code: this.code,
            };

            this.$request.post(api.register, data).then((res) => {
                // console.log(res)

                if (res.errno == 0) {
                    uni.showToast({
                        title: `${res.errmsg}`,
                        icon: "none",
                        duration: 1500,
                    });
                    this.$request.post(api.authLogin, data).then((res) => {
                        uni.setStorageSync("token", res.data.token);
                        uni.setStorageSync("refresh_token", res.data.refreshToken);
                        uni.setStorageSync("nickName", res.data.userInfo.nickName);
                        setTimeout(() => {
                            uni.switchTab({
                                url: "/pages/index/index",
                            });
                        }, 1500);
                    });
                } else {
                    uni.showToast({
                        title: `${res.errmsg}`,
                        icon: "none",
                        duration: 1500,
                    });
                }
            });
        },
        getCode() {
            var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (!reg.test(this.phone)) {
                uni.showToast({
                    icon: "none",
                    title: "手机号码输入有误",
                    duration: 1500,
                });
                return false;
            }
            this.$request
                .post(api.regCaptcha, {
                    mobile: this.phone,
                })
                .then((res) => {
                    // console.log(res)
                    if (res.errno == 0) {
                        uni.showToast({
                            title: "发送成功",
                            duration: 1500,
                        });
                        this.disabled = true;
                        this.getSecond();
                    } else {
                        uni.showToast({
                            title: `${res.errmsg}`,
                            icon: "none",
                            duration: 1500,
                        });
                    }
                });
        },
        getSecond() {
            var that = this;
            setTimeout(function () {
                if (that.num <= 0) {
                    that.disabled = false;
                    that.text = "获取验证码";
                    that.num = 60;
                } else {
                    console.log(that.num);
                    that.num = that.num - 1;
                    that.text = that.num + "s后获取";
                    that.getSecond();
                }
            }, 1000);
        },
        radioChange() {
            console.log("111");
            if (!this.ifCheck) {
                this.ifCheck = true;
            } else {
                this.ifCheck = false;
            }
        },
        showPro() {
            this.showDialog = true;
        },
        show_log() {
            if (!this.showDialog) {
                this.showDialog = true;
            } else {
                this.showDialog = false;
            }
        },
    },
};
</script>

<style scoped>
.btn {
    background-color: #ff1497;
    color: #fff;
    max-width: 650rpx;
    margin-top: 20px;
}

.container {
    padding: 0.5rem;
}

.uni-input {
    border: 0.1rpx solid #e5e5e5;
    padding: 10rpx;
    /* margin-top: 15rpx; */
    border-radius: 10rpx;
    width: 240px;
}

.codeInput.uni-input {
    width: 30vw;
}

.codeBtn {
    width: 100px;
    margin-left: 20rpx;
}

.avatar {
    text-align: center;
    margin-top: 90rpx;
}

.avatar>image {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
}

.pinput {
    padding: 0.5rem;
}

.reg {
    display: flex;
    justify-content: space-between;
    /* margin-top: 20rpx; */
    font-size: 32rpx;
    padding: 0.5rem;
}

.info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.check_pro {
    transform: scale(0.7);
}

.protocol {
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    padding: 0 0.5rem;
}

.span_pro,
.check_pro,
.click_pro {
    vertical-align: middle;
}

.click_pro {
    margin-left: 15px;
    color: rgb(0, 122, 255);
    border-bottom: 1px solid;
}

/deep/ .uni-popup__wrapper-box {
    background-color: #fff !important;
    width: 90%;
    text-align: center;
    padding: 0.5rem;
    height: 70vh;
    overflow: scroll;
}

h3 {
    margin-bottom: 5px;
}

.pop_view {
    font-size: 14px;
    text-align: left;
    text-indent: 2em;
}

.dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
}

.protocol_info {
    background: #fff;
    z-index: 1000;
    height: 70vh;
    margin-top: 15vh;
    padding: 20rpx;
    padding: 2%;
    width: 96%;
}

.protocol_info h3 {
    text-align: center;
}
</style>
