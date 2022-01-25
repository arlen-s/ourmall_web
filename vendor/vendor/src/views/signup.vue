<template>
  <div class="signup-page">
    <div class="home-header">
      <div class="content">
        <h1></h1>
      </div>
    </div>
    <div class="home-main">
      <div class="home-main-content">
        <div class="home-main-alert">
          <homeAlert />
        </div>
        <el-card class="box-card signup-box">
          <div slot="header" class="tx-bold" style="font-size: 18px">
            {{ $t("signup.signup") }}
          </div>
          <!-- 注册 -->
          <el-form
            ref="form"
            :model="formReg"
            :rules="rulesReg"
            :label-width="labelWidth"
          >
            <el-form-item prop="userName">
              <el-input
                v-model="formReg.userName"
                :disabled="loading"
                clearable
                :placeholder="$t('signup.mobile')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                auto-complete="new-password"
                v-model="formReg.password"
                :disabled="loading"
                show-password
                :placeholder="$t('signup.pass')"
              ></el-input>
            </el-form-item>
            <div style="margin-bottom: 20px">
              <template v-if="!showReSend">
                <div
                  v-if="!mobileSeconds"
                  class="drag dragmobile"
                  :style="{ width: maxwidth + 40 + 'px' }"
                >
                  <div class="drag_bg drag_bgmobile"></div>
                  <div class="drag_text">{{ confirmWords }}</div>
                  <div
                    @touchstart="mousedownFn($event)"
                    @mousedown="mousedownFn($event)"
                    class="handler handlermobile handler_bg"
                  ></div>
                </div>
                <span v-else>
                  <span class="mg-r-5 tx-success">{{
                    $t("signup.captchaSent")
                  }}</span
                  >{{ $t("signup.captchaSentSec", {sec: mobileSeconds})}}
                </span>
              </template>
              <span v-else>
                <el-link type="primary" @click="sendToken2">{{
                  $t("signup.captchaAgain")
                }}</el-link>
              </span>
            </div>
            <el-form-item prop="token">
              <el-input
                v-model="formReg.token"
                :disabled="loading"
                :placeholder="$t('signup.captcha')"
              ></el-input>
            </el-form-item>
            <div v-if="error" class="error">
              {{ error }}
            </div>
            <div v-if="success" class="success">{{ success }}</div>
            <div class="d-flex align-items-center justify-content-between">
              <p class="d-flex align-items-center">
                <el-checkbox v-model="isAgree" style="margin: 0"
                  >{{ $t("signup.agree") }}
                </el-checkbox>
                <el-link
                  class="mg-l-5"
                  type="primary"
                  @click="openUserAgreement"
                  >{{ $t("signup.agreement") }}</el-link
                >
              </p>
            </div>
            <div
              class="d-flex"
              style="flex-direction: column; align-items: end; margin-top: 10px"
            >
              <el-form-item style="margin-bottom: 0">
                <el-button
                  type="primary"
                  :loading="loading"
                  style="margin-right: 15px"
                  @click="onSumit('form')"
                  >{{ $t("signup.complete") }}</el-button
                >
              </el-form-item>
            </div>
            <div class="text-right">
              <el-link
                class="d-inline"
                @click="toSignin()"
                style="position: relative; top: 12px"
                >{{ $t("signup.signin") }}</el-link
              >
            </div>
          </el-form>
        </el-card>
      </div>
    </div>
    <Footer />
    <el-dialog
      :title="$t('signup.用户注册协议')"
      :visible.sync="dialogUserAgreementVisible"
      class="dialog-user-agreement"
    >
      <el-scrollbar style="height: 460px" v-if="$i18n.locale == 'zh'">
        <h3>欢迎使用“OurMall”DROPSAHIPPING APP！（以下简称“OurMall”）</h3>
        <p>
          “OurMall”所有权由HK OurMall Technology Co.,
          Limited所有。本协议是OurMall用户与OurMall所有者HK OurMall Technology
          Co.,
          Limited（以下简称为“公司”）之间就“OurMall”服务等相关事宜所订立的契约。为了保障用户的权益，请在注册“OurMall”前，详细阅读本协议。一旦您注册为用户即表示您已接受了以下所述的条款和条件。
        </p>
        <p>
          当您勾选“用户协议”并开始启用本系统时，即表示您已同意接受“OurMall”的相关服务协议约束，包括但不限于本协议、“OurMall”现有的、及时更新的或新发布的用户协议条款和隐私权政策以及其他各项规则、制度等等。
        </p>
        <p>
          “OurMall”有权随时修改和（或）补充前述条款和条件，并只需在“OurMall”上正式公示或者通知，而无需征得您的事先同意。修改后的条款于公示或者通知即时生效。在“OurMall”修改相关协议条款后，您继续使用“OurMall”电子商务平台应被视作您已接受了修改后的条款。除非得到“OurMall”的正式书面授权，任何人不得修改本协议。所有条款标题仅为方便参阅而设置，并不以任何方式界定、限制、解释或描述该条款的范围或限度。本公司及“OurMall”未就用户或其他人员的某项违约行为采取行动，并不表明本公司及本网站撤回就任何继后或类似的违约事件采取行动的权利。
          在本协议中，被许可“OurMall”用户均简称为“OurMall”用户”或“您”。
        </p>
        <h4>第一条、“OurMall”注册与使用</h4>
        <p>
          1.1
          在“OurMall”上注册或者交易许可仅向能够根据相关法律订立具有法律约束力的合约的自然人及企业提供。因此，“OurMall”用户应确认本人已满十八周岁，且系完全民事行为能力人。在“OurMall”上注册并同意本协议条款，将视为“OurMall”的用户。在注册用户通过供应商认证的，此用户将做为“OurMall”的主账号被授权代表本供应商企业进行交易操作，交易操作行为根据用户申请及“OurMall”的审核确定其在“OurMall”的相应角色。
        </p>
        <p>
          1.2
          “OurMall”用户须同时凭用户名、密码及系统验证码进行登录。对于通过其他手段登录、使用所造成的后果，“OurMall”将不承担任何责任。若因此造成不良影响或者损失，“OurMall”将保留追究当事人法律责任的权力。
        </p>
        <p>
          1.3
          在“OurMall”注册时，“OurMall”用户明确表示通过其用户名和密码进行的任何操作（交易等）均应被视为“OurMall”用户本人行为（做为本企业的主账号，“OurMall”将视同授权其代表企业的行为），其法律后果由“OurMall”用户本人或所授权代表的企业承担。“OurMall”用户应妥善保管用户名和密码，并对其使用及其遗失自行承担相应责任。“OurMall”用户承诺，如其用户名和密码遭到未获授权的使用，或者发生其他任何安全问题时，将立即通知“OurMall”。“OurMall”用户在此同意并确认，“OurMall”对因上述情形产生的遗失或损害不负责任。
        </p>
        <h4>第二条、用户实名查证</h4>
        <p>
          2.1
          供货商及采购商获得“OurMall”使用许可前，必须通过供应商认证，即由“OurMall”查证有关该用户在申请取得网站使用许可所提供的信息。“OurMall”有权了解其他信息的真实性、准确性、合理性，“OurMall”用户应认真履行配合义务，否则，“OurMall”有权拒绝提供网站使用许可。“OurMall”用户应始终保持其主体身份（主账号）真实、合法、有效。一旦用户信息有任何变更，应及时通知“OurMall”，“OurMall”用户将及时将更新有效信息提交给“OurMall”授权工作人员。“OurMall”用户同意为自身未及时通知或更新相关信息承担全部责任，如因此而给其他方（包括其关联公司、合作伙伴、代理人、职员等）造成损失的，“OurMall”用户同意赔偿其全部损失（包括律师费等维权费用）。
        </p>
        <p>
          2.2
          用户认证通过审核后，“OurMall”将通过用户在“OurMall”注册时提供的手机号码发出短信通知。对于“OurMall”用户主账号的手机号码变更，由主账号或者其授权机构向“OurMall”提出变更申请，经“OurMall”审核后方可变更。
        </p>
        <h4>第三条、“OurMall”用户义务</h4>
        <p>
          3.1 自觉遵守“OurMall”注册及交易规则
          ，若出现违反相关规则相关规则及制度者，将承担全部责任：
        </p>
        <p>3.1.1 注册用户所提供的信息必须真实可靠；</p>
        <p>
          3.1.2
          “OurMall”用户必须保管好自身账号及密码，若因“OurMall”用户自身泄密账户、密码，并由此造成的一切损失，都由用户负责。
        </p>
        <p>3.1.3 在“OurMall”现货晒场上所挂牌的信息必须真实可靠。</p>
        <p>
          3.1.4
          为保证交易安全，涉及资金问题，所有交易款项根据合同约定暂时由银行冻结出金，经产品或服务采购商确认后转给收款方。
        </p>
        <p>
          3.1.5
          不得利用“OurMall”进行非法交易或其他损害“OurMall”或他人利益的任何行为。
        </p>
        <h4>第四条、“OurMall”权利</h4>
        <p>
          4.1 “OurMall”将按照本协议的规定许可“OurMall”用户使用本网站进行交易。
        </p>
        <p>
          4.2
          “OurMall”有权保存“OurMall”用户的信息，并为了“OurMall”用户的利益用之与其联络。
        </p>
        <p>
          4.3
          “OurMall”有权随时删除含有任何违反法律、法规、软件使用许可协议、各项规则的信息或链接，包括“OurMall”对此有合理怀疑的信息。
        </p>
        <p>
          4.4
          “OurMall”有权对“OurMall”用户使用网站的行为进行监督。且“OurMall”保留在用户违反协议时无需给予通知终止“OurMall”用户使用平台权力。
        </p>
        <p>
          4.5
          上述保证将替代所有其它保证。在适用法律允许的最大范围内，特此替代所有其它保证、条件和声明，无论是明示的、默示的、口头的、法定的和其它方式，并且无论是依据本协议或其它协议而产生的，包括但不限于：不侵权、适合市场销售及适用于某个特定用途的默示保证。
        </p>
        <p>
          4.6
          “OurMall”将在其网络系统内建立合理的安全体系，包括身份识别体系、内部安全防范体系，以使“OurMall”数据完整，并且保密。但“OurMall”用户了解并同意技术手段在不断更新，无法杜绝全部的非安全因素，但“OurMall”会及时更新安全体系，妥善维护网络及相关数据。
        </p>
        <p>
          4.7
          “OurMall”用户在网站上所注册、交易的数据由“OurMall”保管，并根据需要进行分析，为网站提供相关许可范围内的服务。
        </p>
        <h4>第五条、“OurMall”义务</h4>
        <p>
          5.1
          “OurMall”保证对所有用户所有信息进行保密，包括个人信息、货物信息及交易信息等。
        </p>
        <p>5.2 “OurMall”保证其提供网站的合法性。</p>
        <p>5.3 “OurMall”保证其网站上交易货物的信息真实性。</p>
        <h4>第六条、诚信原则</h4>
        <p>
          6.1
          “OurMall”用户承诺，其将恪守诚信原则，“OurMall”用户有下列情形之一的，其完全同意“OurMall”有权立即单方给与包括但不限于警告、公示、限权或终止服务等不同程度的处罚：被终止服务的用户将在“OurMall”网站上进行通告，“OurMall”无需承担任何违约责任，且保留追究其责任的权力。
        </p>
        <p>
          6.1.1
          涉嫌利用软件实施欺诈或其他违法行为的（“OurMall”有权单方对此做出相关认定）；
        </p>
        <p>
          6.1.2
          被任何第三方投诉，称其（含其发布信息中所提及的相关公司，下同）有违约行为，且未能在“OurMall”要求的合理期限内提供证据，或虽在上述期限内提供了证据，但未能充分证明其不存在上述行为的；
        </p>
        <p>
          6.1.3
          未经“OurMall”书面同意，擅自将其帐号和密码转让或泄露给他人的，或售卖或要约售卖其通过“OurMall”获得的相关商业信息的；
        </p>
        <p>
          6.1.4
          利用软件或计算机病毒或者相关木马程序等手段，非法窃取、删除、修改或增加“OurMall”网站或“OurMall”网站其他用户的任何信息，或以其他任何方式危害“OurMall”网站的正常运行的；
        </p>
        <p>
          6.1.5
          存在“OurMall”认定的其他不诚信行为的，或违反其他约定或网站规则的。
        </p>
        <h4>第七条、终止</h4>
        <p>
          7.1
          “OurMall”有权在下列情形下拒绝用户的交易或终止本协议，而无需承担任何责任：
        </p>
        <p>
          7.1.1
          用户违反了本协议或用户服务协议的任一条款，且自“OurMall”通知其纠正后仍未纠正的；
        </p>
        <p>7.1.2 “OurMall”无法确认用户提供的注册信息或银行卡信息的真实性；</p>
        <p>
          7.1.3
          发现用户窃取“OurMall”平台任何信息，用其提供给同行业，或其他不正当用途；
        </p>
        <p>
          7.2
          如协议一方，除为重组或兼并的目的外，通过决议或由法院判令解散，则接收方或指定的债权人代表有权经通知后终止本协议。
        </p>
        <p>
          7.3
          在协议期内，在“OurMall”用户被第三方多次投诉等合理情形下，为避免“OurMall”用户及“OurMall”的损失，“OurMall”有权以短信或其他书面形式通知“OurMall”用户并解除本合同，本合同自通知到达“OurMall”用户处时终止。必要时，将终止用户账号以及用户使用“OurMall”平台的相应权力。
        </p>
        <h4>第八条、不可抗力</h4>
        <p>
          8.1
          由于黑客攻击或政府管制或网络通讯瘫痪等对其发生和后果不能预见的事件，双方均确认此属不可抗力；双方应按照不可抗力对影响履行本协议的程度，协商决定是否解除本协议、免除履行本协议的部分义务，或者延期履行本协议。
        </p>
        <p>
          8.2
          对于因“OurMall”合理控制范围以外的原因，包括但不限于自然灾害、罢工或骚乱、暴动、战争行为、政府行为、通讯或其他设施故障或严重伤亡事故等等，而致使“OurMall”延迟或未能履约的，“OurMall”不对用户承担任何责任。
        </p>
        <h4>第九条、法律及争议解决</h4>
        <p>
          9.1
          本协议适用中华人民共和国法律。如遇本协议有关的某一特定事项缺乏明确法律规定，则应参照通用国际、国内商业惯例和（或）行业惯例。
        </p>
        <p>
          9.2
          因双方就本协议的签订、履行或解释发生争议，双方应努力友好协商解决。如协商不成，任何一方均有权向“OurMall”所在地人民法院起诉。
        </p>
        <p>第十条、知识产权</p>
        <p>
          10.1
          “OurMall”拥有本协议所规定的著作权、商标权、专利权、专利申请权、专有技术、商业秘密以及其他相关的知识产权，包括与该平台有关的各种文档资料，
          如服务内容包括：文字、软件、声音、图片、录像、图表、广告中的全部内容，资讯相关全部信息；电子邮件的全部内容，为用户提供的其他信息。所有这些内容受版权、商标、标签和其它财产所有权法律的保护，其它本协议中未经提及的权利也由“OurMall”保留。
        </p>
        <p>
          10.2
          未经“OurMall”事先书面同意，“OurMall”用户不得为任何营利性或非营利性的目的自行实施、利用、转让或许可任何第三方实施、利用、转让上述知识产权。
        </p>
        <h4>第十一条、协议权利义务的转让</h4>
        <p>
          除非取得“OurMall”事先书面同意，“OurMall”用户不得将其在本协议项下的权利与义务转让给任何第三方。
        </p>
        <p>第十二条、委托扣款协议</p>
        <p>
          “OurMall”注册认证用户以经销商身份使用个人银行卡采购默认接受委托扣款协议，现授权人郑重声明已仔细阅知、理解下述各项规定并同意遵守：
        </p>
        <p>
          12.1
          授权人同意被授权人在合同约定的限期内，委托银行或第三方支付机构从本授权书指定的账户内以约定的资费标准划付到期应付的费用。
        </p>
        <p>
          12.2
          授权人在指定账户中必须留有足够余额，否则因账户余额不足或不可归责于被授权人委托方的任何事由，导致无法及时扣款或扣款错误、失败，责任由授权人自行承担。
        </p>
        <p>
          12.3
          本授权书在授权人使用银行系统或者第三方代收通道支付金额时，自动生效。
        </p>
        <p>
          12.4
          授权人保证本授权书的真实性、合法性、有效性，被授权人依据本授权书进行的委托扣款操作引起的一切法律纠纷或风险，由授权人独立承担或解决。
        </p>
        <h4>第十三条、其他</h4>
        <p>
          13.1 本协议构成“OurMall”用户和“OurMall”间就使用网站的完整的协议
          ，并取代双方就有关本协议所载任何事项于先前以口头及书面达成的共识。
        </p>
        <p>
          13.2
          如本协议的任何条款被视作无效或无法执行，则上述条款可被分离，其余部分则仍具有法律效力。
        </p>
        <p>
          13.3
          本协议的标题仅为方便阅读所设，非对条款的定义、限制、解释或描述其范围或界限。
        </p>
        <p>
          13.4
          “OurMall”于“OurMall”用户过失或违约时放弃本协议规定的权利的，不得视为其对“OurMall”用户的其他或以后同类之过失或违约行为弃权。
        </p>
        <p>
          13.5
          “OurMall”有权随时根据中华人民共和国有关法律、法规的变化、互联网的发展以及公司经营状况和经营策略的调整等修改本协议。“OurMall”用户要继续使用网站就有必要对最新的《“OurMall”协议条款》
          进行仔细阅读和确认。当发生有关争议时，以最新的协议为准。
        </p>
      </el-scrollbar>
      <el-scrollbar style="height: 460px" v-else>
      <p>
        OurMall, Inc. ("OurMall"/"we"/"us"/"our") is committed to protecting
        your privacy. We make the website, www.OurMall.com (the "Website"), and
        the Shopify App “OurMall” (“App”) available together with the OurMall
        services available through the Website and App(the "Service"). As you
        use our services, we want you to be clear how we’re using information
        and the ways in which you can protect your privacy.<br/>
        Our Privacy Policy explains:<br/>● What
        information we collect and why we collect it.<br/>●
        How we use that information and when we disclose it.<br
        
      />● How to access and update your personal information.<br
        
      />Your privacy matters to us so please take the time to familiarize
        yourself with our policies, and if you have any questions please contact
        us at support@OurMall.com.<br/>1. IMPORTANT
        INFORMATION AND WHO WE ARE<br/>Purpose of this
        Privacy Policy<br/>This Privacy Policy aims to give
        you information on how OurMall collects and processes your personal
        information through your use of the Website, App and the Services,
        including any information you may provide when you sign up for a demo of
        our Services, when you create an account and a profile with us, when you
        purchase or use our Services, when you submit status updates, when you
        search our Website or App, when you use our App, when you subscribe to
        our email alerts, when you contact our customer service, when you
        participate in surveys, public forums, chats, or when you respond to one
        of our requests for suggestions and other content.<br
        
      />Please note that neither the Website, App nor the Service is intended
        for children under 16 years of age. No one under age 16 may provide any
        information to or on the Website, App or through our Services. We do not
        knowingly collect personal information from children under 16. If you
        are under 16, do not use or provide any information on the Website, App
        or on or through any of its features, use any of the interactive or
        public comment features of the Website or App or provide any information
        about yourself to us, including your name, address, telephone number,
        email address, or any screen name or user name you may use. If we learn
        we have collected or received personal information from a child under 16
        without verification of parental consent, we will delete that
        information. If you believe we might have any information from or about
        a child under 16, please contact us.<br/>It is
        important that you read this Privacy Policy together with any other
        privacy notice or fair processing notice we may provide on specific
        occasions when we are collecting or processing personal information
        about you so that you are fully aware of how and why we are using your
        information. This Privacy Policy supplements the other notices and is
        not intended to override them.<br/>Controller or
        Processor<br/>To the extent that OurMall holds
        information about you due to your use of our Services, OurMall is the
        controller and responsible for your personal information. To the extent
        that OurMall holds information about you due its presence in content
        uploaded by OurMall customers, OurMall acts as a processor on behalf of
        such customers and the terms of this Privacy Policy does not apply to
        such information.<br/>If you have any questions
        about this Privacy Policy, including any requests to exercise your legal
        rights, please contact us using the details set out below.<br
        
      />Contact Details<br/>Our full details are:<br
        
      />OurMall Inc.<br/>Email address:
        Support@OurMall.com<br/>Postal address: 555 Burrard
        St, Vancouver, BC V7X 1L4<br/>
        If you are based in the European Union, you also have the right to make
        a complaint at any time to your local supervisory authority for data
        protection issues. We would, however, appreciate the chance to deal with
        your concerns before you approach the regulator so please contact us at
        Support@OurMall.com in the first instance.<br
        
      />Changes to the Privacy Policy and your duty to inform us of changes<br
        
      />This version was last updated on October 12th, 2018.<br
        
      />We reserve the right to change the terms of this Privacy Policy at any
        time. When we do, we will post the revised Privacy Policy to our Website
        (as linked within the App) and the last revision date of revision will
        be updated so that you will always be able to understand what
        information we collect, how we use your information, and under what
        circumstances we may share your information with others.<br
        
      />It is important that the personal information we hold about you is
        accurate and current. Please keep us informed if your personal
        information changes during your relationship with us.<br
        
      />Third-party Links<br/>The Website or App may
        include links to third-party websites, plug-ins and applications.
        Clicking on those links or enabling those connections may allow third
        parties to collect or share information about you. We do not control
        these third-party websites and are not responsible for their privacy
        statements. When you leave our Website or App, we encourage you to read
        the privacy notice of every website you visit.<br
        
      />2. THE INFORMATION WE COLLECT ABOUT YOU<br
        
      />Personal data, or personal information, means any information relating
        to an identifiable person who can be directly or indirectly identified.
        It does not include data which cannot be related to an identifiable
        person (anonymous data).<br/>We may collect, use,
        store and transfer different kinds of personal information about you
        which we have grouped together follows:<br/>●
        Identity Data includes first name, last name, username or similar
        identifier.<br/>● Contact Data includes billing
        address, delivery address, email address and telephone numbers.<br
        
      />● Financial Data includes payment card details.<br
        
      />● Transaction Data includes details about payments to and from you and
        other details of services you have purchased from us.<br
        
      />● Technical Data includes internet protocol (IP) address, your mobile
        device’s unique ID number, your login data, browser type and version,
        time zone setting and location, browser plug-in types and versions,
        operating system and platform and other technology on the devices you
        use to access the Website or on which the App is installed and used.<br
        
      />● Profile Data includes your username and password, purchases or
        orders made by you, your location, preferences, feedback and survey
        responses.<br/>● Usage Data includes information
        about how you use our Website, App, other app(s) and Services, such as
        the buttons, controls, products and ads you click on, pages of our App
        or Website that you visit, the time spent on those pages, your search
        queries, the dates and times of your visits or use, but also about the
        products that you are tracking through the App and Service, how often
        you use those products, and other related data regarding such usage by
        you.<br/>● Marketing and Communications Data
        includes your preferences in receiving marketing from us and our third
        parties and your communication preferences.<br/>We
        also collect, use and share Aggregated Data such as statistical or
        demographic data for any purpose. Aggregated Data may be derived from
        your personal information but is not considered personal information in
        law as this information does not directly or indirectly reveal your
        identity. For example, we may aggregate your Usage Data to calculate the
        percentage of users accessing a specific Website feature. However, if we
        combine or connect Aggregated Data with your personal information so
        that it can directly or indirectly identify you, we treat the combined
        data as personal information which will be used in accordance with this
        Privacy Policy.<br/>
        We do not collect any Special Categories of Personal Data about you
        (this includes details about your race or ethnicity, religious or
        philosophical beliefs, sex life, sexual orientation, political opinions,
        trade union membership, information about your health and genetic and
        biometric data). Nor do we collect any information about criminal
        convictions and offences.<br/>If you fail to provide
        personal information<br/>Where we need to collect
        personal information by law, or under the terms of a contract we have
        with you and you fail to provide that information when requested, we may
        not be able to perform the contract we have or are trying to enter into
        with you (for example, to provide you with our services). In this case,
        we may have to cancel a service you have with us but we will notify you
        if this is the case at the time.<br/>3. HOW IS
        PERSONAL INFORMATION COLLECTED<br/>We use different
        methods to collect data from and about individuals including through:<br
        
      />● Direct interactions by you. You may give us Identity, Contact and
        Financial Data by filling in forms, linking through your Shopify account
        or by corresponding with us by post, phone, email or otherwise. This
        includes personal data you provide or permit use to access when you :<br
        
      />● sign up for a demo of our services;<br/>● create
        an account and profile with us;<br/>● purchase one
        of services;<br/>● subscribe to our email alerts;<br
        
      />● complete one of our online forms to receive our reports and case
        studies;<br/>● download or otherwise access one of
        our e-books, magazines, videos;<br/>● contact our
        customer service;<br/>● request marketing to be sent
        to you; or<br/>● give us some feedback.<br
        
      />● Automated technologies or interactions. As you interact with our
        Site, we may automatically collect Technical Data about your equipment,
        browsing actions and patterns. We collect this personal data by using
        cookies, server logs and other similar technologies. We may also receive
        Technical Data and Usage Data about you if you visit other websites
        employing our cookies..<br/>● Third parties or
        publicly available sources. We may receive personal information about
        you from various third parties and public sources as set out below :<br
        
      />● Technical Data from the following parties:<br
        
      />a. analytics providers such as Google Analytics based outside the
        EU;<br/>b. search information providers such as
        Google based inside or outside the EU.<br/>●
        Contact, Financial and Transaction Data from providers of technical,
        payment and delivery services such as Stripe based outside the EU.<br
        
      />● Identity and Contact Data from our partners, data brokers or
        aggregators based inside or outside the EU.<br/>●
        Identity and Contact Data from publicly available sources such as
        LinkedIn, Instagram, and other social networking sites based outside the
        EU.<br/>4. HOW WE USE YOUR PERSONAL INFORMATION<br
        
      />We will only use your personal information when the law allows us to.
        Most commonly, we will use your personal data in the following
        circumstances:<br/>● Where we need to perform the
        contract we are about to enter into or have entered into with you.<br
        
      />● Where it is necessary for our legitimate interests (or those of a
        third party) and your interests and fundamental rights do not override
        those interests.<br/>
        ● Where we need to comply with a legal or regulatory obligation.<br
        
      />The types of lawful basis that we will rely on to process your
        personal data are:<br/>Legitimate Interest - this
        means the interest of our business in conducting and managing our
        business to enable us to give you the best service and the best and most
        secure experience. We make sure we consider and balance any potential
        impact on you (both positive and negative) and your rights before we
        process your personal information for our legitimate interests. We do
        not use your personal information for activities where our interests are
        overridden by the impact on you (unless we have your consent or are
        otherwise required or permitted to by law). You can obtain further
        information about how we assess our legitimate interests against any
        potential impact on you in respect of specific activities by contacting
        us.<br/>Performance of Contract – this means
        processing your information where it is necessary for the performance of
        a contract to which you are a party or to take steps at your request
        before entering into such a contract.<br/>Comply
        with a legal or regulatory obligation -this means processing your
        personal information where it is necessary for compliance with a legal
        or regulatory obligation that we are subject to.<br
        
      />Consent – this means you have consented to our use of data in this
        manner. We may ask for your express consent for certain uses, and you
        are free to withdraw that consent at any time.<br
        
      />Generally we do not rely on consent as a legal basis for processing
        your personal information other than in relation to sending third party
        direct marketing communications to you via email or text message. You
        have the right to withdraw consent to marketing at any time by
        contacting us.<br/>Purposes for which we will use
        your personal information<br/>We have set out below,
        in a table format, a description of all the ways we plan to use your
        personal information, and which of the legal bases we rely on to do so.
        We have also identified what our legitimate interests are where
        appropriate.<br/>Note that we may process your
        personal information for more than one lawful ground depending on the
        specific purpose for which we are using your information. Please contact
        us if you need details about the specific legal ground we are relying on
        to process your personal information where more than one ground has been
        set out in the table below.<br/>Purpos/Activity
        Type of Data<br/>Lawful basis for processing
        including basis of legitimate interest<br/>To
        register you as a new customer<br/>a. Identity<br
        
      />b. Contact<br/>Performance of a contract with
        you<br/>To allow your use of the Service<br
        
      />a. Identity<br/>b. Technical<br
        
      />c. Contact<br/>d. Financial<br
        
      />e. Transaction<br/>Performance of a contract with
        you<br/>To process and deliver your order
        including:<br/>a. Manage payments, fees<br
        
      />and charges<br/>b. Collect and recover<br
        
      />money owed to us<br/>a. Identity<br
        
      />b. Contact<br/>c. Financial<br
        
      />d. Transaction<br/>e. Marketing and<br
        
      />Communications<br/>a. Performance of a contract
        with<br/>you<br/>b. Necessary
        for our legitimate<br/>interests (to recover debts
        due to us)<br/>
        a. To manage our relationship with you which will include:<br
        
      />Performance of a contract with you<br/>a.
        Notifying you about<br/>changes to our terms or<br
        
      />b. Necessary to comply with a legal<br
        
      />obligation<br/>Privacy Policy<br
        
      />c. Necessary for our legitimate<br/>b. Asking you
        to leave a<br/>review or take a survey<br
        
      />interests (to keep our records updated and to study how customers use
        our services)<br/>To enable you to partake in a
        prize draw, competition or complete a survey<br/>a.
        Identity<br/>b. Contact<br/>c.
        Profile<br/>d. Marketing and<br
        
      />Communications<br/>a. Identity<br
        
      />b. Contact<br/>c. Profile<br
        
      />d. Usage<br/>e. Marketing and<br
        
      />Communications<br/>a. Performance of a contract
        with<br/>you<br/>b. Necessary
        for our legitimate<br/>interests (to study how
        customers use our services, to develop them and grow our business)<br
        
      />To administer and protect our business and this Website and Mobile App
        (including troubleshooting, data analysis, testing, system maintenance,
        support, reporting and hosting of data)<br/>a.
        Necessary for our legitimate<br/>interests (for
        running our business, provision of administration and IT services,
        network security, to prevent fraud and in the context of a business
        reorganization or group restructuring exercise)<br
        
      />b. Necessary to comply with a legal<br
        
      />obligation<br/>To use data analytics to improve
        our website, services, customer relationships and experiences<br
        
      />a. Identity<br/>b. Contact<br
        
      />c. Technical<br/>Necessary for our legitimate
        interests (to define types of customers for our services, to keep our
        Website and Mobile App updated and relevant, to develop our business and
        to inform our strategy)<br/>To make suggestions and
        recommendations to you about services that may be of interest to you<br
        
      />a. Technical<br/>b. Usage<br
        
      />a. Identity<br/>b. Contact<br
        
      />c. Technical<br/>d. Usage<br
        
      />e. Profile<br/>Necessary for our legitimate
        interests (to develop our services and grow our business) or where have
        otherwise consented to such usage<br/>Marketing<br
        
      />We strive to provide you with choices regarding certain personal
        information uses, particularly around marketing and advertising. You may
        elect to opt out of receiving any further marketing or advertising
        emails from us through the mechanism provided in those emails. We may
        send you targeted advertising through the Service on to you<br
        
      />Promotional offers from us<br/>
        We may use your Identity, Contact, Technical, Usage and Profile Data to
        form a view on what we think you may want or need, or what may be of
        interest to you. This is how we decide which products, services and
        offers may be relevant for you.<br/>You will receive
        marketing communications from us if you have requested information from
        us or purchased services from us or if you provided us with your details
        when you entered a competition or registered for a promotion and, in
        each case, you have not opted out of receiving that marketing.<br
        
      />Third-party marketing<br/>We will get your express
        opt-in consent before we share your personal information with any
        company outside our company for marketing purposes, including service
        providers who perform marketing services on our behalf, such as
        conducting surveys, sending communications to you on our behalf, or
        serving advertisements to you.<br/>Opting out<br
        
      />You can ask us or third parties to stop sending you marketing messages
        at any time by contacting us at any time.<br/>Where
        you opt out of receiving these marketing messages, this will not apply
        to personal information provided to us as a result of a service
        purchase, service experience or other transactions.<br
        
      />Cookies (website only)<br/>You can set your
        browser to refuse all or some browser cookies, or to alert you when
        websites set or access cookies. If you disable or refuse cookies, please
        note that some parts of this Website may become inaccessible or not
        function properly.<br/>Change of purpose<br
        
      />We will only use your personal information for the purposes for which
        we collected it, unless we reasonably consider that we need to use it
        for another reason and that reason is compatible with the original
        purpose. If you wish to get an explanation as to how the processing for
        the new purpose is compatible with the original purpose, please contact
        us at Support@OurMall.com .<br/>If we need to use
        your personal information for an unrelated purpose, we will notify you
        and we will explain the legal basis which allows us to do so.<br
        
      />Please note that we may process your personal information without your
        knowledge or consent, in compliance with the above rules, where this is
        required or permitted by law.<br/>5. DISCLOSURES OF
        YOUR PERSONAL INFORMATION BY US OUTSIDE OF THE SERVICES<br
        
      />We may have to share your personal information with the parties set
        out below for the purposes set out in the table in paragraph 4 above.<br
        
      />● Third Party categories as set out below:<br/>●
        Service providers who provide IT and system administration services.<br
        
      />● Social networking sites to which you have linked your account.<br
        
      />● Professional advisers including lawyers, bankers, auditors and
        insurers based in Canada and the United States who provide consultancy,
        banking, legal, insurance and accounting services.<br
        
      />● Regulators and other government authorities [acting as processors or
        joint controllers based in Canada, the United States and in the EEA who
        require reporting of processing activities in certain circumstances.<br
        
      />● Third parties to whom we may choose to sell, transfer, or merge
        parts of our business or our assets. Alternatively, we may seek to
        acquire other businesses or merge with them. If a change happens to our
        business, then the new owners may use your personal information in the
        same way as set out in this Privacy Policy.<br/>
        We require all third parties to respect the security of your personal
        information and to treat it in accordance with the law. We do not allow
        our third-party service providers to use your personal information for
        their own purposes and only permit them to process your personal
        information for specified purposes and in accordance with our
        instructions.<br/>6. INTERNATIONAL TRANSFERS<br
        
      />We share your personal information within our company and to our third
        party service providers such as Amazon Web Services or other providers.
        This may involve transferring your information internationally including
        without limitation, if you are based in the European Union, transferring
        your data outside the European Economic Area (EEA).<br
        
      />Many of our external third parties are also based outside the European
        Economic Area (EEA) so their processing of your personal information
        will involve a transfer of data outside the EEA.<br
        
      />If you are based in the European Union, whenever we transfer your
        personal information out of the EEA, we ensure a similar degree of
        protection is afforded to it by ensuring appropriate safeguards are
        implemented.<br/>Please contact us if you want
        further information on the specific mechanism used by us when
        transferring your personal data out of the EEA.<br
        
      />8. DATA SECURITY<br/>We have put in place
        appropriate security measures to prevent your personal information from
        being accidentally lost, used or accessed in an unauthorized way,
        altered or disclosed. In addition, we limit access to your personal
        information to those employees, agents, contractors and other third
        parties who have a business need to know. They will only process your
        personal information on our instructions and they are subject to a duty
        of confidentiality.<br/>We have put in place
        procedures to deal with any suspected personal data breach and will
        notify you and any applicable regulator of a breach where we are legally
        required to do so.<br/>9. DATA RETENTION<br
        
      />How long will you use my personal information for?<br
        
      />We will only retain your personal information for as long as necessary
        to fulfil the purposes we collected it for, including for the purposes
        of satisfying any legal, accounting, or reporting requirements.<br
        
      />To determine the appropriate retention period for personal
        information, we consider the amount, nature, and sensitivity of the
        personal information, the potential risk of harm from unauthorized use
        or disclosure of your personal information, the purposes for which we
        process your personal information and whether we can achieve those
        purposes through other means, and the applicable legal requirements.<br
        
      />By law we have to keep basic information about our customers
        (including Contact, Identity, Financial and Transaction Data) for six
        years after they cease being customers for tax and other legally
        required purposes.<br/>In some circumstances you can
        ask us to delete your information: see Request erasure below for further
        information.<br/>In some circumstances we may
        anonymize your personal information (so that it can no longer be
        associated with you) for research or statistical purposes in which case
        we may use this information indefinitely without further notice to
        you.<br/>10. YOUR LEGAL RIGHTS<br
        
      />Under certain circumstances, you have rights under data protection
        laws in relation to your personal information. You may have the right
        to:<br/>● Request access to your personal
        information (commonly known as a “data subject access request”). This
        enables you to receive a copy of the personal information we hold about
        you and to check that we are lawfully processing it.<br
        
      />● Request correction of the personal information that we hold about
        you. This enables you to have any incomplete or inaccurate information
        we hold about you corrected, though we may need to verify the accuracy
        of the new information you provide to us.<br/>●
        Request erasure of your personal information. This enables you to ask us
        to delete or remove personal information where there is no good reason
        for us continuing to process it. You also have the<br
        
      />
        right to ask us to delete or remove your personal information where you
        have successfully exercised your right to object to processing (see
        below), where we may have processed your information unlawfully or where
        we are required to erase your personal information to comply with local
        law. Note, however, that we may not always be able to comply with your
        request of erasure for specific legal reasons which will be notified to
        you, if applicable, at the time of your request.<br
        
      />● Object to processing of your personal information where we are
        relying on a legitimate interest (or those of a third party) and there
        is something about your particular situation which makes you want to
        object to processing on this ground as you feel it impacts on your
        fundamental rights and freedoms. You also have the right to object where
        we are processing your personal information for direct marketing
        purposes. In some cases, we may demonstrate that we have compelling
        legitimate grounds to process your information which override your
        rights and freedoms.<br/>● Request restriction of
        processing of your personal information. This enables you to ask us to
        suspend the processing of your personal information in the following
        scenarios: (a) if you want us to establish the information’s accuracy;
        (b) where our use of the information is unlawful but you do not want us
        to erase it; (c) where you need us to hold the information even if we no
        longer require it as you need it to establish, exercise or defend legal
        claims; or (d) you have objected to our use of your information but we
        need to verify whether we have overriding legitimate grounds to use
        it.<br/>● Request the transfer of your personal
        information to you or to a third party. We will provide to you, or a
        third party you have chosen, your personal information in a structured,
        commonly used, machine-readable format. Note that this right only
        applies to automated information which you initially provided consent
        for us to use or where we used the information to perform a contract
        with you.<br/>● Withdraw consent at any time where
        we are relying on consent to process your personal information. However,
        this will not affect the lawfulness of any processing carried out before
        you withdraw your consent. If you withdraw your consent, we may not be
        able to provide certain services to you. We will advise you if this is
        the case at the time you withdraw your consent.<br
        
      />● If you wish to exercise any of the rights set out above, please
        contact us using the details set out above.<br/>No
        fee usually required<br/>You will not have to pay a
        fee to access your personal information (or to exercise any of the other
        rights). However, we may charge a reasonable fee if your request is
        clearly unfounded, repetitive or excessive. Alternatively, we may refuse
        to comply with your request in these circumstances.<br
        
      />What we may need from you<br/>We may need to
        request specific information from you to help us confirm your identity
        and ensure your right to access your personal information (or to
        exercise any of your other rights). This is a security measure to ensure
        that personal information is not disclosed to any person who has no
        right to receive it. We may also contact you to ask you for further
        information in relation to your request to speed up our response.<br
        
      />Time limit to respond<br/>We try to respond to all
        legitimate requests within one month. Occasionally it may take us longer
        than a month if your request is particularly complex or you have made a
        number of requests. In this case, we will notify you and keep you
        updated.<br/>Effective date: October 12th, 2018
      </p>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogUserAgreementVisible = false">
          {{$t("signup.我知道了")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import homeAlert from "./../components/homeAlert";
import Footer from "./../components/footer";
export default {
  data() {
    return {
      loading: false,
      labelWidth: "0px",
      formReg: {
        userName: "",
        password: "",
        rePassword: "",
        token: "",
      },
      rulesReg: {
        userName: [
          {
            required: true,
            message: this.$t("signup.enterMobile"),
            trigger: "blur",
          },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+|^1[3-9]\d{9}$/,
            message: this.$t("signup.errorMobile"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("signup.enterPass"),
            trigger: "blur",
          },
          { min: 6, message: this.$t("signup.passBits"), trigger: "blur" },
          {
            pattern: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/,
            message: this.$t("signup.passBits"),
            trigger: "blur",
          },
        ],
        token: [
          {
            required: true,
            message: this.$t("signup.enterCaptcha"),
            trigger: "blur",
          },
        ],
      },
      mobileSeconds: 0,
      beginClientX: 0 /*距离屏幕左端距离*/,
      mouseMoveStata: false /*触发拖动状态  判断*/,
      maxwidth: 318 /*拖动最大宽度，依据滑块宽度算出来的*/,
      confirmWords: this.$t("signup.getCaptcha") /*滑块文字*/,
      confirmSuccess: false /*验证成功判断*/,
      isAgree: true,
      dialogUserAgreementVisible: false,
      showReSend: false,
      error: "",
      errorT: 0,
      success: "",
      successT: 0,
    };
  },
  components: {
    homeAlert,
    Footer,
  },
  mounted() {
    this.mouseOnFuction();
    document.querySelectorAll(".drag").forEach(function (el) {
      el.addEventListener(
        "touchmove",
        function (event) {
          event.preventDefault();
        },
        false
      );
    });
  },
  methods: {
    openUserAgreement() {
      this.dialogUserAgreementVisible = true;
    },
    isCMobile(mobile) {
      return mobile ? /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+|^1[3-9]\d{9}$/.test(mobile) : false;
    },
    sendToken2() {
      this.confirmSuccess = true;
      this.sendToken();
    },
    sendToken() {
      if (!this.formReg.userName || !this.isCMobile(this.formReg.userName)) {
        clearInterval(this.errorT);
        this.error = this.$t("signup.correctNum");
        this.errorT = setInterval(() => {
          this.error = "";
        }, 5000);
        this.dragReset();
        return;
      }
      if (!this.confirmSuccess) {
        clearInterval(this.errorT);
        this.error = this.$t("signup.slideBar");
        this.errorT = setInterval(() => {
          this.error = "";
        }, 5000);
        this.dragReset();
        return;
      }
      this.loading = true;
      this.$apiCall(
        "api.User.sendToken",
        { mobile: this.formReg.userName },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.mobileSeconds = 60;
            this.showReSend = false;
            let t = setInterval(() => {
              if (this.mobileSeconds == 1) {
                this.dragReset();
                this.showReSend = true;
                clearInterval(t);
              }
              this.mobileSeconds--;
            }, 1000);
          } else {
            this.dragReset();
            clearInterval(this.errorT);
            this.error = r.Message;
            this.errorT = setInterval(() => {
              this.error = "";
            }, 5000);
          }
        }
      );
    },
    move(e) {
      //滑动移动
      var width = 0;
      if (this.mouseMoveStata) {
        if (e.type == "mousemove") {
          width = e.clientX - this.beginClientX;
        } else if (e.type == "touchmove") {
          width = e.changedTouches[0].clientX - this.beginClientX;
        }
        if (width > 0 && width <= this.maxwidth) {
          $(".handlermobile").css({ left: width });
          $(".drag_bgmobile").css({ width: width });
        } else if (width > this.maxwidth) {
          this.dragSuccess();
          this.sendToken();
        }
      }
    },
    up(e) {
      //滑动释放
      this.mouseMoveStata = false;
      var width = 0;
      if (e.type == "mouseup") {
        width = e.clientX - this.beginClientX;
      } else if (e.type == "touchend") {
        width = e.changedTouches[0].clientX - this.beginClientX;
      }
      if (width < this.maxwidth) {
        $(".handlermobile").css({ left: 0 });
        $(".drag_bgmobile").css({ width: 0 });
      }
    },
    mouseOnFuction() {
      //绑定
      document.addEventListener("touchmove", this.move, { passive: false });
      document.addEventListener("mousemove", this.move, false);
      document.addEventListener("touchend", this.up, false);
      document.addEventListener("mouseup", this.up, false);
    },
    dragSuccess() {
      $(".handlermobile").removeClass("handler_bg").addClass("handler_ok_bg");
      $(".dragmobile").css({ color: "#fff" });
      $(".handlermobile").css({ left: this.maxwidth });
      $(".drag_bgmobile").css({ width: this.maxwidth });
      //解绑
      document.removeEventListener("touchmove", this.move, false);
      document.removeEventListener("mousemove", this.move, false);
      document.removeEventListener("touchend", this.up, false);
      document.removeEventListener("mouseup", this.up, false);
      this.confirmWords = this.$t("signup.success");
      this.confirmSuccess = true;
    },
    dragReset() {
      $(".handlermobile").removeClass("handler_ok_bg").addClass("handler_bg");
      $(".dragmobile").css({ color: "#868ba1" });
      $(".handlermobile").css({ left: 0 });
      $(".drag_bgmobile").css({ width: 0 });
      this.beginClientX = 0;
      this.mouseMoveStata = false;
      this.confirmWords = this.$t("signup.getCaptcha");
      this.confirmSuccess = false;
      this.maxwidth = 318;
      //解绑
      document.removeEventListener("touchmove", this.move, false);
      document.removeEventListener("mousemove", this.move, false);
      document.removeEventListener("touchend", this.up, false);
      document.removeEventListener("mouseup", this.up, false);
      this.mouseOnFuction();
    },
    mousedownFn(e) {
      this.mouseMoveStata = true;
      if (e.type == "mousedown") {
        this.beginClientX = e.clientX;
      } else if (e.type == "touchstart") {
        this.beginClientX = e.changedTouches[0].clientX;
      }
    },
    toSignin() {
      this.$router.push({ name: "signin" });
    },
    onSumit(form) {
      const rid = this.$route.query.rid || "";
      if (!this.isAgree) {
        clearInterval(this.errorT);
        this.error = this.$t("signup.read");
        this.errorT = setInterval(() => {
          this.error = "";
        }, 5000);
        return;
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.error = "";
          this.loading = true;
          this.$apiCall(
            "api.User.register",
            {
              username: this.formReg.userName,
              password: this.formReg.password,
              code: this.formReg.token,
              type: 2,
              ivc: this.$route.query.ivc,
              relationshipId: rid,
              lang: this.lang
            },
            (r) => {
              if (r.ErrorCode == 9999) {
                clearInterval(this.successT);
                this.success = this.$t("signup.successful");
                this.successT = setInterval(() => {
                  this.success = "";
                }, 5000);
                this.$router.push({ name: "signin" });
              } else {
                this.loading = false;
                clearInterval(this.errorT);
                this.error = r.Message;
                this.errorT = setInterval(() => {
                  this.error = "";
                }, 5000);
                // this.$message({ message: r.Message, type: "error" });
              }
            }
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.signup-page {
  position: relative;
  height: 100%;
  min-height: 750px;
}
.signup-box {
  position: absolute;
  top: 120px;
  right: 10px;
  width: 400px;
  user-select: none;
}
.drag {
  position: relative;
  background-color: #e8e8e8;
  width: 100%;
  height: 34px;
  margin-left: 0;
  margin-top: 0;
  line-height: 34px;
  text-align: center;
}
.handler {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 40px;
  height: 34px;
  border: 1px solid #ccc;
  cursor: move;
}
.handler_bg {
  background: #fff url("./../../public/images/double-right.png") center
    no-repeat;
  background-size: 50%;
}
.handler_ok_bg {
  background: #fff url("./../../public/images/check-circle-fill.png") center
    no-repeat;
  background-size: 50%;
}
.drag_bg {
  background-color: #7ac23c;
  height: 34px;
  width: 0px;
}
.drag_text {
  position: absolute;
  top: 0px;
  width: 100%;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
.home-main-content {
  margin: 0 auto;
  width: 1280px;
  position: relative;
}
.dialog-user-agreement {
  h3 {
    margin-bottom: 15px;
    line-height: 26px;
    color: #303133;
    font-size: 18px;
  }
  h4 {
    margin-bottom: 10px;
    line-height: 26px;
    color: #909399;
  }
  p {
    margin-bottom: 10px;
    line-height: 26px;
    color: #606266;
  }
}
.error {
  position: relative;
  top: -5px;
  color: #f56c6c;
  font-size: 12px;
}
.success {
  position: relative;
  top: -5px;
  color: #67c23a;
  font-size: 12px;
}
</style>
