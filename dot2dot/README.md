目录

<span id="back"></span>  <!- 在目录末尾加一个隐藏锚点 ->

- [Dot2Dot Readme in English](#c1)
- [Dot2Dot Readme 中文说明](#c2)

--

# <span id="c1">Dot2Dot Readme in English</span>
## 1	Product Description
**1.1** This is a social platform created by Chinese people, but it is not exclusive to Chinese users.
- 1.1.1 The content you post here will be semantically analyzed by AI and then randomly weighted for discovery and recommendation.
- 1.1.2 It can analyze Chinese, English, Russian, and even smaller languages.
- 1.1.3 Anyone can use it, and anyone has a chance to find people who share their interests and values here.

**1.2** User registration requires an email address, which is displayed by default on the user’s profile.
- 1.2.1 By using this old-fashioned, non-real-time method of contact, we want users to feel more secure.
- 1.2.2 Want to use other ways to get in touch? Feel free to share them peer-to-peer yourself.
- 1.2.3 Don’t want to disclose your email at all? Then this place might not be for you.

## 2	Positioning
The slogan is: “**To find the dot-to-dot connection, to see a spiritual way of life.**”
- Dot2Dot is a dating APP ... (❌)
- Dot2Dot is similar to BBS function ... (❌)
- Here I can demonstrate my spiritual life ... (✅)
- Here I want “Resonant People” to contact me via email ... (✅)

## 3	Concept Design

--
[返回目录](#back)

# <span id="c2">Dot2Dot Readme 中文说明</span>
## 1	产品描述
1.1 Dot2Dot项目缘起：
- 我反感注意力经济的弊端，然并卵。那些社交平台在此潮流里采取纵容的态度；为了挣钱，不寒碜。可是，真善美在与假恶丑的博弈中，式微。
- 好在来到2025年，我们能用上AI啦。本平台的最大特点是用AI解析用户发布内容，把价值观认同的内容更高概率的展示出来。
- 然而，本平台没打算做“价值观暴君”，没有禁止那些不被鼓励的用户内容，只以概率区别对待。
- 当湖水还浅的时候，您能看到湖底的岩石；随着源头活水越来越多流入，您将看到一湖海蓝！

1.2 想做成这样的交友平台：有道德、慢车马、轻量化。
- 不禁止特定信息，但调用AI解析语义，将价值观不符的信息往下沉、少展示。这是概率问题。
- 禁用图片展示，这样可从源头上大幅减少诱惑。在算法上鼓励以兴趣爱好为纽带建立点对点连接，但这里只是起点，走向哪里靠个人，靠缘分。别急着得到什么，我们就能大幅免疫。

1.3 主要特征：利用具备持续升级能力的AI调用方法去筛选用户权重和内容权重。


## 2	产品定位
**「找得到点对点的连接，看得见精神生活内容」**

如果您不需要"点对点"的连接，那么这平台不适合您，这里不鼓励"点对网"的连接（比如树洞、分享、记录、展示）。

- 要基于兴趣爱好，这里的连接不要基于其它事（比如婚恋、长期关系、交易或交换）。缺少共通的精神生活和兴趣爱好，其它事很悬。

- 兴趣爱好是指：没有必要做，但自主的喜欢做又可以经常做的事。"可以经常做"是重要限定条件，比如某人喜欢喝大酒，出于健康考虑便不可以经常做；比如某人喜欢约P，基于公序良俗不被允许经常做……那些，不是本平台所讲的兴趣爱好。

本平台要有道德操守，不为谋利而纵容人性贪嗔痴，不追求用户留存、活跃度，追求"对用户有用" —— 用户觉得有用，用完离开了，也是平台的价值（欢迎再来，这里不设门槛）。

## 3	设计举措
**3.1** 要实现产品定位，首先是做减法，砍掉与核心功能和产品定位不甚相关的产品功能和性能。
* 不显示关注或被关注列表，不显示性别、年龄、头像、职业，不具备留言和评论功能。不支持图片和视频格式的广播信息，只有纯字符。不支持聊天功能。
	- Dot2Dot是以兴趣爱好为纽带建立点对点连接的平台，不需要那些附加的功能，在这里，兴趣爱好是入口，其它的事请用户自己安排“点对点”沟通。

* 以邮箱登录平台时不要求密码验证，以邮箱注册时不要求验证邮箱。
	- 用户邮箱对平台的作用是维护user_id白名单，这样在收到新增的广播时，不在白名单的邮件就放弃掉。并不需要验证声称是bob@163.com的用户确实是bob@163.com的主人。

* 若用户长期未登录，删除他在此平台的所有记录。
	- 用户bob不再登录，说明他的点对点社交意愿已不可确认，不要再让他出现在其它用户的视野中。Bob想再回平台，重新注册就是，无门槛，只是以前的记录没有了。

* 用户每天可以发出N条广播，但平台每天对每个用户只新增一条展示，其余放在队列里依次展示在平台。Dot2Dot是慢车马，是这氛围，也能省资源。
	- 控制数据库的规模，这样做对用户的损失却相对小。

* 用户的第21条广播被展示出来时，他的第1条会被删除，也就是FIFO，他的展示上限是20条。久远事，不留痕。
	- Dot2Dot是慢车马，是这氛围，也能省资源。

* 鼓励“点对点”联系方式。默认联系方式： 用户注册信息是 Email，展示在用户主页。
	- 用Email这种古早的、非实时的联系方式，让用户觉得安全些。想用别的联系方式？点对点的自己给。连Email也不想公布？那就不用上平台来发布信息了。


**3.2** 接着是用一套以AI赋能的筛选机制，让好内容优先呈现，实现「找得到点对点的连接，看得见精神生活内容」。

--
[返回目录](#back)
