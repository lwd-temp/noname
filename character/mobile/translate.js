import { lib, game, ui, get, ai, _status } from "../../noname.js";

const translates = {
	liuzan: "手杀留赞",
	liuzan_prefix: "手杀",
	re_sp_zhugeliang: "手杀界卧龙",
	re_sp_zhugeliang_prefix: "手杀界",
	ly_piliche: "霹雳车",
	ly_piliche_info: "当你对其他角色造成伤害后，你可以弃置其装备区内的所有牌。",
	polu: "破橹",
	polu_info: "锁定技，回合开始时，若【霹雳车】未加入游戏或在牌堆/弃牌堆内，则你使用之；当你受到1点伤害后，若你的装备区里没有【霹雳车】，则你摸一张牌并使用牌堆中的一张随机武器牌。",
	choulve: "筹略",
	choulve_info: "出牌阶段开始时，你可以令一名其他角色交给你一张牌，若其如此做，视为你使用上一张对你过造成伤害且不为延时锦囊牌的牌。",
	tunchu: "屯储",
	tunchu_info: "摸牌阶段，若你没有「粮」，你可以多摸两张牌。若如此做，摸牌阶段结束时，你可以将任意张手牌置于你的武将上，称为「粮」，只要你的武将牌上有「粮」，你便不能使用【杀】。",
	shuliang: "输粮",
	shuliang_info: "一名角色的结束阶段开始时，若其手牌数少于体力值，你可以移去一张「粮」，然后该角色摸两张牌。",
	fenyin: "奋音",
	yingjian: "影箭",
	fenyin_info: "你的回合内，当你使用牌时，若此牌与你于此回合内使用的上一张牌的颜色不同，则你可以摸一张牌。",
	yingjian_info: "准备阶段开始时，你可以视为使用一张无距离限制的【杀】。",
	dujin: "独进",
	dujin_info: "摸牌阶段，你可以多摸X+1张牌（X为你装备区里牌数的一半且向上取整）。",
	shixin: "释衅",
	shixin_info: "锁定技，当你受到火属性伤害时，你防止此伤害。",
	zhaohuo: "招祸",
	zhaohuo_info: "锁定技，当其他角色进入濒死状态时，你将体力上限调整为1点。若你的体力上限因此减少，则你摸X张牌。（X为你以此法减少的体力上限）",
	yixiang: "义襄",
	yixiang_info: "每名角色的回合限一次，当你成为一名角色使用牌的目标后，若该角色的体力值大于你的体力值，你可以随机获得牌堆里的一张你没有的基本牌。",
	yirang: "揖让",
	yirang_info: "出牌阶段开始时，你可以将所有非基本牌交给一名体力上限大于你的其他角色，然后调整体力上限至与该角色相同并回复X点体力（X为你以此法交给其的牌的类别数）。",
	kuangcai: "狂才",
	kuangcai_info: "出牌阶段开始时，你可以令你此阶段内的主动出牌时间变为5秒。若如此做，你于此阶段内使用牌没距离和次数限制，且每当你于此阶段内使用牌时，你摸一张牌且主动出牌时间-1秒。若主动出牌时间减至0，则你结束出牌阶段。",
	shejian: "舌剑",
	shejian_info: "弃牌阶段结束时，若你于此阶段弃置过至少两张牌且这些牌花色均不相同，则你可以弃置一名其他角色的一张牌。",
	xinfu_daigong: "怠攻",
	xinfu_daigong_info: "每回合限一次。当你受到伤害时，你可以展示所有手牌，然后令伤害来源选择一项：交给你一张与你所有手牌花色均不相同的一张牌，或防止此伤害。",
	xinfu_zhaoxin: "昭心",
	xinfu_zhaoxin_info: "出牌阶段限一次，你可以将任意张手牌置于武将牌上并摸等量的牌，称之为「望」（你至多拥有三张「望」）。你或你攻击范围内的一名其他角色的摸牌阶段结束后，其可以获得一张由你选择的「望」，然后你可以对其造成1点伤害。",
	zhaoxin_give: "昭心",
	zhaoxin_give_info: "",
	xinfu_qianchong: "谦冲",
	xinfu_qianchong_info: "锁定技，若你的装备区内有牌且：均为红色，则你视为拥有技能〖明哲〗。均为黑色，则你视为拥有技能〖帷幕〗。若均不满足，则出牌阶段开始时，你可以选择一种类别的牌，然后你本回合内使用该类别的牌时没有次数和距离限制。",
	qc_weimu: "帷幕",
	qc_weimu_info: "",
	qc_mingzhe: "明哲",
	qc_mingzhe_info: "",
	xinfu_shangjian: "尚俭",
	xinfu_shangjian_info: "锁定技。一名角色的结束阶段开始时，若你于此回合内不因使用装备牌而失去了X张或更少的牌，则你摸等量的牌（X为你的体力值）。",
	rw_bagua_skill: "先天八卦阵",
	rw_bagua_skill_info: "当你需要使用或打出一张【闪】时，你可以进行判定，若判定结果不为黑桃，视为你使用或打出了一张【闪】。",
	rw_baiyin_skill: "照月狮子盔",
	rw_baiyin_skill_info: "锁定技，当你受到大于1的伤害时，你将伤害值改为1；当你失去装备区里的【照月狮子盔】时，你回复1点体力并摸两张牌。",
	rw_lanyinjia: "精银甲",
	rw_lanyinjia_info: "你可以将一张手牌当做【闪】使用或打出。锁定技，【精银甲】不会无效。",
	rw_minguangkai_cancel: "耀光铠",
	rw_minguangkai_cancel_info: "锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
	rw_minguangkai_link: "耀光铠",
	rw_minguangkai_link_info: "锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
	rw_renwang_skill: "仁王金刚盾",
	rw_renwang_skill_info: "黑色【杀】和红桃【杀】对你无效。",
	rw_tengjia1: "桐油百韧甲",
	rw_tengjia1_info: "锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
	rw_tengjia2: "桐油百韧甲",
	rw_tengjia2_info: "锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
	rw_tengjia3: "桐油百韧甲",
	rw_tengjia3_info: "锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
	rw_tengjia4: "桐油百韧甲",
	rewrite_bagua: "先天八卦阵",
	rewrite_bagua_info: "当你需要使用或打出一张【闪】时，你可以进行判定，若判定结果不为黑桃，视为你使用或打出了一张【闪】。",
	rewrite_baiyin: "照月狮子盔",
	rewrite_baiyin_info: "锁定技，当你受到大于1的伤害时，你将伤害值改为1；当你失去装备区里的【照月狮子盔】时，你回复1点体力并摸两张牌。",
	rewrite_lanyinjia: "精银甲",
	rewrite_lanyinjia_info: "你可以将一张手牌当做【闪】使用或打出。锁定技，【精银甲】不会无效。",
	rewrite_minguangkai: "耀光铠",
	rewrite_minguangkai_info: "锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
	rewrite_renwang: "仁王金刚盾",
	rewrite_renwang_info: "黑色【杀】和红桃【杀】对你无效。",
	rewrite_tengjia: "桐油百韧甲",
	rewrite_tengjia_info: "锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
	rewrite_zhuge: "元戎精械弩",
	rewrite_zhuge_info: "锁定技，你于出牌阶段内使用【杀】无次数限制。",
	rw_zhuge_skill: "诸葛连弩",
	rw_zhuge_skill_info: "锁定技，你于出牌阶段内使用【杀】无次数限制。",
	takaramono: "宝物",
	wolong_card: "卧龙",
	wolong_card_info: "对一名角色造成1点火焰伤害。若场上有存活的诸葛亮(火)，则改为对至多两名角色各造成1点火焰伤害。",
	fengchu_card: "凤雏",
	fengchu_card_info: "横置至多三名角色。若场上有存活的庞统(火)，则改为横置至多四名角色。",
	xuanjian_card: "玄剑",
	xuanjian_card_info: "令一名角色摸一张牌并回复1点体力。若场上有存活的徐庶(将/界)，则改为令一名角色摸一张牌并回复1点体力，然后你摸一张牌。",
	shuijing_card: "水镜",
	shuijing_card_info: "将一名角色装备区内的防具牌移动到另一名角色对应区域。若场上有存活的司马徽，则改为将1名角色装备区内的1件装备移动到另1角色对应区域。",
	xinfu_pingcai: "评才",
	xinfu_pingcai_info: "出牌阶段限一次，你可以挑选一个宝物并擦拭掉其上面的灰尘。然后，你可以根据宝物类型执行对应的效果。",
	xinfu_pdgyingshi: "隐世",
	xinfu_pdgyingshi2: "隐世",
	xinfu_pdgyingshi_info: "锁定技，你始终跳过准备阶段，判定阶段，结束阶段。你不能被选择为延时锦囊牌的目标。",
	pcaudio_wolong_card: "卧龙",
	pcaudio_wolong_card_info: "",
	pcaudio_fengchu_card: "凤雏",
	pcaudio_fengchu_card_info: "",
	pcaudio_shuijing_card: "水镜",
	pcaudio_shuijing_card_info: "",
	pcaudio_xuanjian_card: "玄剑",
	pcaudio_xuanjian_card_info: "",
	yizan_respond_sha: "翊赞",
	yizan_respond_sha_info: "",
	yizan_use: "翊赞",
	yizan_use_backup: "翊赞",
	yizan_use_info: "你可以将两张牌（其中至少一张为基本牌）当做任意基本牌使用或打出。",
	yizan_respond_shan: "翊赞",
	yizan_respond_shan_info: "",
	xinfu_longyuan: "龙渊",
	xinfu_longyuan_info: "觉醒技，准备阶段，若你本局游戏内发动过〖翊赞〗的次数大于等于3，则你修改〖翊赞〗。",
	yizan_rewrite: "翊赞·改",
	yizan_rewrite_info: "你可以将一张基本牌当做任意基本牌使用或打出。",
	yizan_count: "翊赞",
	yizan_count_info: "",
	xinfu_jingxie1: "精械",
	xinfu_jingxie1_info: "出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，然后对其进行强化。当你处于濒死状态时，你可以重铸一张防具牌，然后将体力回复至1点。",
	xinfu_jingxie2: "精械",
	xinfu_jingxie2_info: "",
	xinfu_qiaosi: "巧思",
	xinfu_qiaosi_info: "出牌阶段限一次，你可以投掷一枚六面骰子，亮出牌堆顶的X张牌并获得之。然后，你选择一项：1.交给一名其他角色X张牌。2.弃置X张牌。（X为骰子的点数）",
	xin_xiahoudun: "手杀界夏侯惇",
	xin_xiahoudun_prefix: "手杀界",
	xinqingjian: "清俭",
	xinqingjian2: "清俭",
	xinqingjian_info: "每回合限一次。当你不因摸牌阶段的额定摸牌而得到牌后，你可以将任意张牌扣置于武将牌上。回合结束时，你将这些牌交给一名其他角色。若这些牌的数量大于1，你摸一张牌。",
	zhangyì: "张翼",
	jiakui: "贾逵",
	zhiyi: "执义",
	zhiyi_info: "锁定技，当你于一回合内使用或打出第一张基本牌时，你选择一项：1.摸一张牌。2.于此牌A（若此牌是因响应牌B而使用或打出的，则改为牌B）的使用或打出流程结算完成后，视为使用一张与此牌名称和属性相同的卡牌。",
	rezhiyi: "执义",
	rezhiyi_info: "锁定技，一名角色的结束阶段开始时，若你本回合内使用或打出过基本牌，则你选择一项：1.摸一张牌。2.视为使用一张你本回合内使用或打出过的基本牌。",
	zhongzuo: "忠佐",
	zhongzuo_info: "一名角色的结束阶段开始时，若你于此回合内造成或受到过伤害，则你可以令一名角色摸两张牌。若该角色已受伤，则你摸一张牌。",
	wanlan: "挽澜",
	wanlan_info: "限定技，当一名角色进入濒死状态时，你可以弃置所有手牌（无牌可不弃）。其回复体力至1点，然后你对当前回合角色造成1点伤害。",
	re_jikang: "手杀嵇康",
	re_jikang_prefix: "手杀",
	shenpei: "审配",
	re_wangyun: "手杀王允",
	re_wangyun_prefix: "手杀",
	relianji: "连计",
	relianji_info: "出牌阶段限一次，你可以选择两名其他角色。第一名角色随机使用牌堆中的一张武器牌，然后这名角色视为对另一名角色随机使用一张下列的牌名的牌：【决斗】、【火攻】、【南蛮入侵】、【万箭齐发】或普【杀】。然后若此牌造成伤害，你获得X枚“连计”标记（X为此次扣减的体力值点数）。",
	remoucheng: "谋逞",
	remoucheng_info: "觉醒技，当一名角色因〖连计〗造成伤害后，若你拥有的“连计”标记数大于2，你加1点体力上限，回复1点体力，失去“连计”，获得“矜功”。",

	shouye: "守邺",
	shouye_info: "每回合限一次。当其他角色使用牌指定你为唯一目标时，你可以与其进行【对策】。若你赢，则你取消此牌的目标，且你于此牌结算完成后获得其对应的所有实体牌。",
	liezhi: "烈直",
	liezhi_info: "准备阶段，你可以依次弃置至多两名其他角色区域内的各一张牌。若你受到过伤害，则〖烈直〗于你的下个回合无效。",

	xinzhanyi: "战意",
	xinzhanyi_info: "出牌阶段限一次，你可以弃置一张牌并失去1点体力，然后根据你弃置的牌获得以下效果直到回合结束：基本牌，你可以将一张基本牌当作杀、酒或桃使用，且你本回合第一次以此法使用的牌的回复值/伤害值+1；锦囊牌，摸三张牌且你使用的牌不能被【无懈可击】响应；装备牌，你使用【杀】指定唯一目标后，其弃置两张牌，然后你获得其中的一张。",
	xinzhanyi_basic_backup: "战意",
	xinzhanyi_basic: "战意",
	xinzhanyi_equip: "战意",

	meiyong: "姝勇",
	meiyong_info: "当你使用或打出【杀】时，你可以获得一名其他角色的一张牌，然后其摸一张牌。",
	rexushen: "许身",
	rexushen_info: "限定技，出牌阶段，你可以失去X点体力（X为场上男性角色的数量）。若你以此法进入了濒死状态，则当你因一名角色而脱离此濒死状态后，你可以令其获得技能〖武圣〗和〖当先〗。",
	rezhennan: "镇南",
	rezhennan_info: "当你成为其他角色使用的牌的目标后，若此牌的目标数大于该角色的体力值，则你可以弃置一张牌并对其造成1点伤害。",

	hujinding: "手杀胡金定",
	hujinding_prefix: "手杀",
	huaizi: "怀子",
	huaizi_info: "锁定技，你的手牌上限为你的体力上限。",
	renshi: "仁释",
	renshi_info: "锁定技，当你受到【杀】的伤害时，若你已受伤，则你防止此伤害并获得此【杀】对应的所有实体牌，然后减1点体力上限。",
	wuyuan: "武缘",
	wuyuan_info: "出牌阶段限一次，你可将一张【杀】交给一名其他角色，然后你回复1点体力，其摸一张牌。若此【杀】为：红色【杀】，其回复1点体力；属性【杀】，其改为摸两张牌。",

	re_weiwenzhugezhi: "手杀卫温诸葛直",
	re_weiwenzhugezhi_prefix: "手杀",
	gz_re_xugong: "许贡",
	re_xugong: "手杀许贡",
	re_xugong_prefix: "手杀",
	re_zhanggong: "手杀张恭",
	re_zhanggong_prefix: "手杀",
	reqianxin: "遣信",
	reqianxin_info: "出牌阶段限一次，你可将至多两张手牌随机交给等量的其他角色，称为「信」。这些角色的准备阶段开始时，若其手牌中有「信」，则其选择一项：令你摸两张牌，本回合手牌上限-2。",
	rebiaozhao: "表召",
	rebiaozhao_info: "结束阶段，你可以将一张牌置于武将牌上，称为「表」。当有一张与「表」点数相同的牌进入弃牌堆后，你将「表」置入弃牌堆并失去1点体力。准备阶段，若你的武将牌上有「表」，则你移去「表」并选择一名角色，该角色回复1点体力并摸三张牌。",
	rebiaozhao2: "表召",
	rebiaozhao2_info: "",
	rebiaozhao3: "表召",
	rebiaozhao3_info: "",
	refuhai: "浮海",
	refuhai_info: "出牌阶段限一次，你可令其他角色同时在「潮起」和「潮落」中选择一项，并依次展示这些角色的选项。若从你下家开始选择了相同选项的角色数目大于1，则你摸X张牌（X为连续相同结果的数量）。",
	qiaosi: "巧思",
	qiaosi_info: "出牌阶段限一次，你可以表演「大键角色图」并根据表演结果获得相应的牌。然后，你选择一项：1.弃置X张牌。2.将X张牌交给一名其他角色。（X为你以此法得到的牌数）",
	qiaosi_map: "大键角色图",
	qiaosi_map_info: "<br><li>星野 梦美：锦囊牌*2<br><li>能美 库特莉亚芙卡：装备牌/【杀】/【酒】*1<br><li>友利 奈绪：【杀】/【酒】*1<br><li>神尾 观铃：【闪】/【桃】*1<br><li>伊吹 风子：锦囊牌/【闪】/【桃】*1<br><li>仲村 由理：装备牌*2<br><li>Illustration:うら;Twitter:@ura530",
	qiaosi_c1: '<img src="' + lib.assetURL + 'image/card/qiaosi_card1.png" width="60" height="60"> ',
	//星野 梦美
	qiaosi_c2: '<img src="' + lib.assetURL + 'image/card/qiaosi_card2.png" width="60" height="60"> ',
	//能美 库特莉亚芙卡
	qiaosi_c3: '<img src="' + lib.assetURL + 'image/card/qiaosi_card3.png" width="60" height="60"> ',
	//友利 奈绪
	qiaosi_c4: '<img src="' + lib.assetURL + 'image/card/qiaosi_card4.png" width="60" height="60"> ',
	//神尾 观铃
	qiaosi_c5: '<img src="' + lib.assetURL + 'image/card/qiaosi_card5.png" width="60" height="60"> ',
	//伊吹 风子
	qiaosi_c6: '<img src="' + lib.assetURL + 'image/card/qiaosi_card6.png" width="60" height="60"> ',
	//仲村 由理

	yangbiao: "手杀杨彪",
	yangbiao_prefix: "手杀",
	zhaohan: "昭汉",
	zhaohan_info: "锁定技，你的第1-4个准备阶段开始时，你加1点体力上限并回复1点体力，你的第5-7个准备阶段开始时，你减1点体力上限。",
	rangjie: "让节",
	rangjie_info: "当你受到1点伤害后，你可以选择一项并摸一张牌：获得牌堆里你选择的类型的一张牌，或移动场上的一张牌。",
	yizheng: "义争",
	yizheng2: "义争",
	yizheng_info: "出牌阶段限一次，你可以和一名体力值不大于你的其他角色拼点。若你赢，其跳过下个摸牌阶段。若你没赢，你减1点体力上限。",
	re_heqi: "手杀贺齐",
	re_heqi_prefix: "手杀",
	reqizhou: "绮胄",
	reqizhou_info: "锁定技，你根据装备区里牌的花色数获得以下技能：1种或以上：〖英姿〗；2种或以上：〖奇袭〗；3种或以上：〖旋风〗。",
	reshanxi: "闪袭",
	reshanxi2: "闪袭",
	reshanxi_info: "出牌阶段开始时，你可以弃置一张红色基本牌并选择一名有牌的其他角色，将其的至多X张牌置于其的武将牌上（X为你的体力值）。回合结束时，该角色获得这些牌。",
	chendeng: "手杀陈登",
	chendeng_prefix: "手杀",
	zhouxuan: "周旋",
	zhouxuan2: "周旋",
	zhouxuan_info: "出牌阶段限一次，你可以弃置一张牌并指定一名角色，然后选择一个基本牌的名称或非基本牌的类型。其使用或打出下一张牌时，若此牌的名称或类型和你选择的相同，则你观看牌堆顶的三张牌，然后将这些牌以任意分割方式交给任意名角色。",
	fengji: "丰积",
	fengji_info: "锁定技，回合结束时，你记录你的手牌数。准备阶段开始时，若你的手牌数不小于你记录的手牌数，则你摸两张牌且本回合手牌上限为体力上限。",
	re_guanqiujian: "手杀毌丘俭",
	re_guanqiujian_prefix: "手杀",
	rezhengrong: "征荣",
	rehongju: "鸿举",
	reqingce: "清侧",
	reqingce_backup: "清侧",
	rezhengrong_info: "当你于出牌阶段使用的指定了其他角色为目标的牌结算完成后，若此牌是你本局游戏内于出牌阶段使用的指定了其他角色为目标的第偶数张牌，则你可以将一名其他角色角色的随机一张牌置于你的武将牌上，称为「荣」。",
	rehongju_info: "觉醒技，准备阶段，若你武将牌上「荣」的数量不小于3且有角色死亡，则你摸等同于「荣」数量的牌。然后可以用任意数量的手牌交换等量的「荣」。你减1点体力上限并获得技能〖清侧〗。",
	reqingce_info: "出牌阶段，你可以将一张「荣」置入弃牌堆，然后弃置场上的一张牌。",
	re_pangtong: "手杀界庞统",
	re_pangtong_prefix: "手杀界",
	dongcheng: "手杀董承",
	dongcheng_prefix: "手杀",
	chengzhao: "承诏",
	chengzhao_info: "一名角色的结束阶段，若你于本回合内获得了两张以上的牌，则你可以与一名其他角色拼点。若你赢，你视为对其使用一张无视防具的【杀】。",
	yangyi: "手杀杨仪",
	yangyi_prefix: "手杀",
	duoduan: "度断",
	duoduan_info: "每回合限一次，当你成为【杀】的目标后，你可以重铸一张牌。若如此做，你选择一项：①令使用者摸两张牌，且此【杀】无效。②令使用弃置一张牌，且你不能响应此【杀】。",
	gongsun: "共损",
	gongsun_info: "出牌阶段开始时，你可以弃置两张牌并指定一名其他角色。你选择一个基本牌或普通锦囊牌的牌名。直到你的下回合开始或你死亡，你与其不能使用或打出或弃置此名称的牌。",
	gongsun_shadow: "共损",
	xin_chengpu: "手杀界程普",
	xin_chengpu_prefix: "手杀界",
	relihuo: "疠火",
	relihuo_damage: "疠火",
	relihuo_baigei: "疠火",
	relihuo_info: "当你使用普【杀】时，你可以将此杀改为火属性。若如此做，当你因执行此【杀】的效果而对横置角色造成伤害时，此伤害+1；当你使用的火【杀】结算完成后，你失去X点体力（X为你因此【杀】造成的伤害总点数的一半且向下取整）。",
	dengzhi: "手杀邓芝",
	dengzhi_prefix: "手杀",
	jimeng: "急盟",
	jimeng_info: "出牌阶段开始时，你可以获得一名其他角色的一张牌，然后交给该角色X张牌（X为你当前体力值）。",
	shuaiyan: "率言",
	shuaiyan_info: "弃牌阶段开始时，若你的手牌数大于1，则你可以展示所有手牌，然后你令一名其他角色交给你一张牌。",
	zhengxuan: "郑玄",
	zhengjing: "整经",
	zhengjing_info: "出牌阶段，你可以整理卡牌。然后，你将整理出的卡牌中的至少一张作为“经”置于一名角色的武将牌上，然后获得其余的牌。该角色的准备阶段获得这些牌，且跳过此回合的判定和摸牌阶段。",
	zhengjing2: "整经",

	mobile_yijiang: "将星独具",
	yj_zhanghe: "☆张郃",
	yj_zhanghe_prefix: "☆",
	yj_zhangliao: "☆张辽",
	yj_zhangliao_prefix: "☆",
	yj_xuhuang: "☆徐晃",
	yj_xuhuang_prefix: "☆",
	yj_ganning: "☆甘宁",
	yj_ganning_prefix: "☆",
	xhzhiyan: "治严",
	xhzhiyan_info: "出牌阶段，若你的手牌数不等于体力上限，则你可以将手牌摸至/弃至手牌上限，然后本回合不能对其他角色使用牌/可以将弃置的一张牌交给一名其他角色。",
	zhilve: "知略",
	zhilve_info: "锁定技，准备阶段，你选择一项：1.移动场上装备区的一张牌并失去1点体力。2.移动场上判定区的一张牌并令本回合手牌上限-1。3.本回合摸牌阶段多摸一张牌且使用的第一张【杀】无距离限制且不计入次数限制。",
	xinzhilve: "知略",
	xinzhilve_backup: "知略",
	xinzhilve_mark: "知略",
	xinzhilve_info: "出牌阶段限一次，你可以失去1点体力并选择一项：1.移动场上的一张牌；2.视为使用一张无距离限制且不计入次数限制的【杀】并摸一张牌。然后你本回合的手牌上限+1。",
	xinxhzhiyan: "治严",
	xinxhzhiyan_false: "治严",
	xinxhzhiyan_info: "出牌阶段每项各限一次，若你的手牌数：大于体力值，则你可以将X张手牌交给一名其他角色（X为你的手牌数与体力值之差）；小于体力上限，则你可以摸X张牌且本阶段内不能再对其他角色使用牌。（X为你的手牌数与体力上限之差）",
	weifeng: "威风",
	weifeng2: "威风",
	weifeng3: "威风",
	weifeng_info: "锁定技，当你于出牌阶段内使用第一张伤害性基本牌或普通锦囊牌后，你令此牌的一名没有“惧”的其他目标角色获得一枚名称为此牌牌名的“惧”。有“惧”的角色受到伤害时，其移去“惧”，然后若造成伤害的牌名称和“惧”：相同，此伤害+1；不同，你获得该角色的一张牌。准备阶段开始时或你死亡时，你移去场上的所有“惧”。",
	gnjinfan: "锦帆",
	gnjinfan_gain: "锦帆",
	gnjinfan_info: "弃牌阶段开始时，你可将任意张手牌置于武将牌上，称为“铃”（每种花色的“铃”限一张）。你可以如手牌般使用或打出“铃”。当有“铃”移动到处理区后，你从牌堆中获得与“铃”花色相同的一张牌。",
	gnsheque: "射却",
	gnsheque_info: "一名其他角色的准备阶段开始时，若其装备区内有牌，则你可以对其使用一张【杀】（无距离关系的限制且无视防具）。",
	sp_sufei: "手杀苏飞",
	sp_sufei_prefix: "手杀",
	zhengjian: "诤荐",
	zhengjian_draw: "诤荐",
	zhengjian_mark: "诤荐",
	zhengjian_info: "锁定技，结束阶段，你令一名角色获得一枚“诤”。回合开始时，你令有“诤”的角色移去“诤”并摸X张牌（X为其最后一次获得“诤”后使用和打出的牌数，且至多不能超过其体力上限或5）。",
	gaoyuan: "告援",
	gaoyuan_info: "当你成为【杀】的目标时，你可弃置一张牌将此【杀】转移给一名有“诤”且不是此【杀】使用者的其他角色。",
	tongqu: "通渠",
	tongqu_info: "游戏开始时，你拥有一个“渠”标记。准备阶段，你可以失去1点体力令一名没有“渠”标记的角色获得“渠”标记。有“渠”的角色摸牌阶段额外摸一张牌，然后将一张牌交给其他有“渠”的角色或弃置。若以此法给出的是装备牌则使用之。当有“渠”的角色进入濒死状态时，移除其“渠”标记。",
	xinwanlan: "挽澜",
	xinwanlan_info: "当一名角色受到伤害值不小于体力值的伤害时，你可以弃置装备区中的所有牌（至少一张） 防止此伤害。",
	re_xusheng: "手杀界徐盛",
	re_xusheng_prefix: "手杀界",
	re_dongzhuo: "手杀界董卓",
	re_dongzhuo_prefix: "手杀界",
	rejiuchi: "酒池",
	rejiuchi_info: "你可以将一张黑桃手牌当做【酒】使用。当你于回合内使用带有【酒】效果的【杀】造成伤害时，你令你的〖崩坏〗失效直到回合结束。",
	furong: "手杀傅肜",
	furong_prefix: "手杀",
	xuewei: "血卫",
	xuewei_info: "准备阶段，你可以选择一名其他角色（仅自己可见）。若如此做，直到你的下回合开始前，当其第一次受到伤害时，你防止此伤害，改为由你受到等量的伤害并对伤害来源造成等量同属性的伤害。",
	liechi: "烈斥",
	liechi_info: "锁定技，当你进入濒死状态时，伤害来源弃置一张牌。",
	xin_liaohua: "手杀界廖化",
	xin_liaohua_prefix: "手杀界",
	redangxian: "当先",
	redangxian_info: "锁定技，回合开始时，你从弃牌堆中获得一张【杀】并进行一个额外的出牌阶段。",
	refuli: "伏枥",
	refuli_info: "限定技，当你处于濒死状态时，你可以将体力值回复至X点（X为势力数）。然后若你的体力值为全场唯一最多，你翻面。",
	xin_caozhang: "手杀界曹彰",
	xin_caozhang_prefix: "手杀界",
	rejiangchi: "将驰",
	rejiangchi_info: "出牌阶段开始时，你可以选择一项：1、摸一张牌，若如此做，你本阶段内不能使用【杀】。 2、弃置一张牌，若如此做，此阶段你使用【杀】无距离限制且你可以额外使用一张【杀】。",
	rezhenxing: "镇行",
	rezhenxing_info: "结束阶段开始时或当你受到伤害后，你可以观看牌堆顶的三张牌，然后你获得其中与其余牌花色均不相同的一张牌。",
	xin_jianyong: "手杀界简雍",
	xin_jianyong_prefix: "手杀界",
	xinqiaoshui: "巧说",
	xinqiaoshui_info: "出牌阶段限一次，你可以和一名其他角色拼点。若你赢，则你本阶段内使用的下一张基本牌或普通锦囊牌可以增加减少一个目标。若你没赢，你本阶段内不能使用锦囊牌。",
	xinjyzongshi: "纵适",
	xinjyzongshi_info: "当你拼点后，你可以观看牌堆顶的一张牌，然后选择一项：获得此牌，或获得两张拼点牌中点数较小的一张。",
	dingyuan: "手杀丁原",
	dingyuan_prefix: "手杀",
	beizhu: "备诛",
	beizhu_draw: "备诛",
	beizhu_info: "出牌阶段限一次，你可以观看一名其他角色的手牌。若其中：没有【杀】，你弃置其一张牌，然后你可令其获得牌堆中的一张【杀】；有【杀】，其依次对你使用这些【杀】，当你因此受到1点伤害后，你摸一张牌。",
	xin_zhuran: "手杀界朱然",
	xin_zhuran_prefix: "手杀界",
	mobiledanshou: "胆守",
	mobiledanshou_info: "一名其他角色的结束阶段开始时，若X：为0，你摸一张牌；不等于0，你可弃置X张牌并对其造成1点伤害（X为其本回合内使用的目标包含你的牌的数量）。",
	yanghuiyu: "羊徽瑜",
	hongyi: "弘仪",
	hongyi2: "弘仪",
	hongyi_info: "出牌阶段限一次，你可以选择一名其他角色。你的下回合开始前，该角色造成伤害时进行判定，若结果为：黑色，此伤害-1。红色，受到伤害的角色摸一张牌。",
	requanfeng: "劝封",
	requanfeng_gain: "劝封",
	requanfeng_info: "限定技。①其他角色死亡时，你可失去〖弘仪〗，然后获得其武将牌上的所有非主公技，非隐匿技和非Charlotte技，加1点体力上限并回复1点体力。②当你处于濒死状态时，你可以加2点体力上限，然后回复4点体力。",
	quanfeng: "劝封",
	quanfeng_info: "锁定技，限定技，一名角色死亡时，你选择获得其的一个技能（主公技，限定技，觉醒技，隐匿技，使命技，带有Charlotte标签的技能除外），然后加1点体力上限并回复1点体力。",
	simashi: "手杀司马师",
	simashi_prefix: "手杀",
	baiyi: "败移",
	baiyi_info: "限定技，出牌阶段，若你已受伤，你可以交换两名其他角色的座次。",
	jinglve: "景略",
	jinglve2: "景略",
	jinglve3: "景略",
	jinglve_info: "出牌阶段限一次，若场上没有与你对应的「死士」牌，则你可以观看一名其他角色的手牌，将其中一张牌标记为「死士」。当其使用对应的实体牌中包含「死士」的牌时，你取消此牌的所有目标。当「死士」牌不因使用而进入弃牌堆，或其回合结束后，若「死士」牌仍在其区域内，则你获得此牌。",
	shanli: "擅立",
	shanli_info: "觉醒技，准备阶段，若你已发动过〖败移〗且对至少两名角色发动过〖景略〗，则你减1点体力上限并选择一名角色。系统随机选择三个不为〖忘隙(仲村由理)〗的主公技，然后你选择其中一个技能，令其获得之。其将交互表情中的【拖鞋】和【酒杯】替换为【枷锁】和【玉玺】。",
	re_lingtong: "手杀界凌统",
	re_lingtong_prefix: "手杀界",
	re_liubiao: "手杀界刘表",
	re_liubiao_prefix: "手杀界",
	hucheer: "手杀胡车儿",
	hucheer_prefix: "手杀",
	daoji: "盗戟",
	daoji_info: "出牌阶段限一次，你可以弃置一张非基本牌并选择一名装备区里有牌的其他角色，你获得其装备区中的一张牌并使用之。若你以此法得到的牌是武器牌，则你使用此牌后对其造成1点伤害。",
	xin_hansui: "手杀韩遂",
	xin_hansui_prefix: "手杀",
	xinniluan: "逆乱",
	xinniluan_info: "其他角色的结束阶段，若其本回合对除其以外的角色使用过牌，则你可以对其使用一张【杀】。若以此法使用的【杀】造成伤害，则你弃置其一张牌。",
	xiaoxi_hansui: "骁袭",
	xiaoxi_hansui_info: "你可以将一张黑色牌当做【杀】使用或打出。",
	xin_zhangfei: "手杀界张飞",
	xin_zhangfei_prefix: "手杀界",
	liyong: "厉勇",
	liyong2: "厉勇",
	liyong3: "厉勇",
	liyong_info: "锁定技，若你于出牌阶段内使用的【杀】被【闪】抵消，则你获得如下效果：你本回合使用的下一张【杀】不可被响应且伤害+1，指定的目标本回合非锁定技失效，当此【杀】造成伤害后，若目标角色未死亡，你失去1点体力。",
	gongsunkang: "公孙康",
	juliao: "据辽",
	juliao_info: "锁定技，其他角色计算与你的距离始终+X（X为场上势力数-1）。",
	taomie: "讨灭",
	taomie1: "讨灭",
	taomie2: "讨灭",
	taomie3: "讨灭",
	taomie4: "讨灭",
	taomie_info: "当你受到伤害后或当你造成伤害后，你可以令伤害来源或受伤角色获得“讨灭”标记（如场上已有标记则转移给该角色）；你和拥有“讨灭”标记的角色视为在彼此的攻击范围内，且当你对该角色造成伤害时，选择一项：1. 此伤害+1；2. 你获得其区域内的一张牌并可将之交给另一名角色；3. 依次执行前两项并于伤害结算后弃置其“讨灭”标记。",
	xin_guohuai: "手杀界郭淮",
	xin_guohuai_prefix: "手杀界",
	mobilejingce: "精策",
	mobilejingce_info: "结束阶段，若此回合因使用或打出而置入弃牌堆的牌的数量不小于你的体力值，则你可以摸两张牌。",
	xin_panzhangmazhong: "手杀界潘璋马忠",
	xin_panzhangmazhong_prefix: "手杀界",
	xinduodao: "夺刀",
	xinduodao_info: "当你受到伤害后，你可以获得伤害来源装备区里的武器牌。",
	xinanjian: "暗箭",
	xinanjian_info: "锁定技，当你使用【杀】指定目标后，若你不在目标角色攻击范围内，你选择一项：1. 令其无法响应此【杀】；2. 其受到此【杀】造成的伤害+1。",
	xin_fuhuanghou: "手杀界伏寿",
	xin_fuhuanghou_prefix: "手杀界",
	xinzhuikong: "惴恐",
	xinzhuikong_info: "每轮限一次，其他角色的回合开始时，若其体力值不小于你，你可与其拼点。若你赢，其本回合无法使用牌指定除其以外的角色为目标；若你没赢，你获得其拼点的牌，然后其视为对你使用一张【杀】。",
	xinqiuyuan: "求援",
	xinqiuyuan_info: "当你成为【杀】的目标时，你可以令另一名其他角色交给你一张除【杀】以外的基本牌，否则其也成为此【杀】的目标。",
	xin_gongsunzan: "手杀界公孙瓒",
	xin_gongsunzan_prefix: "手杀界",
	re_dengai: "手杀界邓艾",
	re_dengai_prefix: "手杀界",
	flappybird: "飞鸟",
	flappybird_info: "出牌阶段，你可游玩一局Flappy Bird。",
	re_handang: "手杀界韩当",
	re_handang_prefix: "手杀界",
	nanhualaoxian: "手杀南华老仙",
	nanhualaoxian_prefix: "手杀",
	yufeng: "御风",
	yufeng2: "御风",
	yufeng_info: "出牌阶段限一次，你可以表演“御风飞行”。若表演失败，则你摸X张牌。若表演成功，则你可以选择至多X名其他角色获得“御风”效果，然后摸X-Y张牌（准备阶段开始时，你进行判定。若结果为：红色，你跳过摸牌阶段；黑色，你跳过出牌阶段和弃牌阶段。X为你的得分。Y为你选择的角色数）。",
	tianshu: "天书",
	tianshu_info: "出牌阶段开始时，若场上没有【太平要术】，则你可以弃置一张牌并选择一名角色。该角色获得并使用【太平要术】。",
	re_jiangwei: "手杀界姜维",
	re_jiangwei_prefix: "手杀界",
	retiaoxin: "挑衅",
	retiaoxin_info: "出牌阶段限一次，你可以指定一名有牌的其他角色，该角色需对你使用一张【杀】，否则你弃置其一张牌。",
	re_zhurong: "手杀界祝融",
	re_zhurong_prefix: "手杀界",
	relieren: "烈刃",
	relieren_info: "当你使用【杀】指定目标后，你可以和目标角色进行拼点。若你赢，你获得其一张牌。若你没赢，你获得对方的拼点牌，其获得你的拼点牌。",
	zhouqun: "周群",
	tiansuan: "天算",
	tiansuan_info: "出牌阶段限一次，若场上没有因你产生的“命运签”，则你可以抽取一张“命运签”，然后令一名角色获得“命运签”直到你的下回合开始。若你以此法抽取的“命运签”为：上上签，你观看其手牌；上上签/上签，你获得其区域内的一张牌。",
	tiansuan_faq: "【命运签】说明",
	tiansuan_faq_info: "当你抽取“命运签”时，你可以令其中一种命运签的权重+1。<br>上上签（权重1）：当你受到伤害时，防止此伤害。<br>上签（权重2）：当你受到伤害时，你令伤害值改为1；当你受到1点伤害后，你摸一张牌。<br>中签（权重3）：当你受到伤害时，你令伤害属性改为火属性并将伤害值改为1。<br>下签（权重2）：当你受到伤害时，你令此伤害+1。<br>下下签（权重1）：当你受到伤害时，你令此伤害+1。你不能使用【酒】或【桃】。",
	tiansuan2_0: "命运签",
	tiansuan2_1: "命运签",
	tiansuan2_2: "命运签",
	tiansuan2_damage: "命运签",
	tiansuan2_fire: "命运签",
	tiansuan2_3: "命运签",
	tiansuan2_4: "命运签",
	ol_yujin: "手杀界于禁",
	ol_yujin_prefix: "手杀界",
	rejieyue: "节钺",
	rejieyue_info: "结束阶段开始时，你可以将一张牌交给一名其他角色。然后其选择一项：令你摸三张牌：或其保留一张手牌和装备区的牌，然后弃置其余的牌。",
	xin_zhoucang: "手杀界周仓",
	xin_zhoucang_prefix: "手杀界",
	mobilezhongyong: "忠勇",
	mobilezhongyong_info: "当你于出牌阶段内使用的【杀】结算结束后，若没有目标角色使用【闪】响应过此【杀】，则你可获得此【杀】；否则你可选择一项：①获得目标角色使用的【闪】，然后可将此【杀】交给另一名其他角色。②将目标角色使用的【闪】交给另一名其他角色，然后你本回合使用【杀】的次数上限+1且下一张【杀】的伤害值基数+1。（你不能使用本回合因执行〖忠勇〗的效果得到的牌）",
	xin_caifuren: "手杀界蔡夫人",
	xin_caifuren_prefix: "手杀界",
	xinqieting: "窃听",
	xinqieting_info: "其他角色的回合结束时，若其本回合内未对其他角色造成过伤害，则你可选择一项：①摸一张牌。②观看其两张手牌并获得其中的一张。③将其装备区内的一张牌移动至你的装备区。",
	xinguixiu: "闺秀",
	xinguixiu_info: "锁定技。结束阶段，若你的体力值为：奇数，你摸一张牌；偶数，你回复1点体力。",
	re_zhonghui: "手杀界钟会",
	re_zhonghui_prefix: "手杀界",
	requanji: "权计",
	requanji_info: "出牌阶段结束时，若你的手牌数大于体力值，或当你受到1点伤害后，你可以摸一张牌，然后将一张手牌置于武将牌上，称为“权”；你的手牌上限+X（X为“权”的数量）。",
	xin_guyong: "手杀界顾雍",
	xin_guyong_prefix: "手杀界",
	xinshenxing: "慎行",
	xinshenxing_info: "出牌阶段限X次（X为你的体力值），你可以弃置两张牌，然后摸一张牌。若这两张牌颜色不同，则改为摸两张牌。",
	xinbingyi: "秉壹",
	xinbingyi_info: "结束阶段，你可展示所有手牌。若这些牌的颜色或类型均相同，则你可以令至多X名角色各摸一张牌（X为你的手牌数）。",
	qiaozhou: "手杀谯周",
	qiaozhou_prefix: "手杀",
	zhiming: "知命",
	zhiming_info: "准备阶段开始时或弃牌阶段结束时，你摸一张牌，然后可以将一张牌置于牌堆顶。",
	xingbu: "星卜",
	xingbu_info: "结束阶段，你可以展示牌堆顶的三张牌，然后你可以根据X值（X为这三张牌中红色牌的数量），令一名其他角色获得对应的效果直到其下回合结束：①三张：其摸牌阶段多摸两张牌，使用【杀】的次数上限+1。②两张：其使用【杀】的次数上限-1，跳过弃牌阶段。③小于两张：其于准备阶段开始时弃置一张手牌。",
	xin_sunluban: "手杀界孙鲁班",
	xin_sunluban_prefix: "手杀界",
	xinzenhui: "谮毁",
	xinzenhui_info: "出牌阶段限一次。当你使用【杀】或黑色普通锦囊牌指定目标时，你可选择另一名能成为此牌目标的其他角色并选择一项：①令其也成为此牌的目标。②获得其一张牌，然后将此牌的使用者改为该角色。",
	xinjiaojin: "骄矜",
	xinjiaojin_info: "当你受到男性角色造成的伤害时，你可以弃置一张装备牌并防止此伤害。",
	xin_caozhen: "手杀界曹真",
	xin_caozhen_prefix: "手杀界",
	discretesidi: "司敌",
	discretesidi_info: "①当你使用的不为延时锦囊牌的牌结算结束后，你可选择一名R内不存在以a为第一序偶的二元序偶的其他角色a，并选择一名角色b，在关系R内建立二元序偶&lt;a,b&gt;（b对其他角色不可见）。②一名角色a使用不为延时锦囊牌的牌指定b为目标时，若(aRb)∧(此牌目标数为1)为真，则{你从R内移除&lt;a,b&gt;，且：若b为你，你摸一张牌；若b不为你，你可选择：⒈取消此牌的目标，然后若场上没有处于濒死状态的角色，则你对a造成1点伤害。⒉摸两张牌}；否则{你清除R内以a为第一元素的二元序偶}。",
	fuqian: "傅佥",
	jueyong: "绝勇",
	jueyong_info: "锁定技。①当你不因〖绝勇〗成为唯一牌的目标时，若此牌不为转化牌且对应的实体牌牌数为1且不为【桃】或【酒】且你的“绝”数小于你的体力值，则你将此牌置于你的武将牌上，称为“绝”，且取消此牌的目标。②结束阶段开始时，若你有“绝”，则你令所有“绝”的原使用者依次对你使用所有“绝”，将无法使用的“绝”置入弃牌堆。",
	poxiang: "破降",
	poxiang_info: "出牌阶段限一次。你可以将一张牌交给一名其他角色。你摸三张牌（不计入本回合的手牌上限），移去所有“绝”并失去1点体力。",
	mayuanyi: "马元义",
	jibing: "集兵",
	jibing_info: "①摸牌阶段开始时，若你的“兵”数小于势力数，则你可以改为将牌堆顶的两张牌置于你的武将牌上，称为“兵”。②你可以将一张“兵”当做【杀】或【闪】使用或打出。",
	wangjing: "往京",
	wangjing_info: "锁定技。当你因〖集兵〗而使用或打出牌时，若对方是场上体力值最高的角色，则你摸一张牌。",
	moucuan: "谋篡",
	moucuan_info: "觉醒技。准备阶段，若你的“兵”数不小于势力数，则你减1点体力上限并获得〖兵祸〗。",
	binghuo: "兵祸",
	binghuo_info: "一名角色的结束阶段开始时，若你本回合内因〖集兵〗而使用或打出过牌，则你可令一名角色判定。若判定结果为黑色，则你对其造成1点雷属性伤害。",
	yanpu: "阎圃",
	huantu: "缓图",
	huantu_info: "每轮限一次。一名角色的摸牌阶段开始前，若其在你攻击范围内，则你可以交给其一张牌并令其跳过此阶段。然后你于此回合的结束阶段选择一项：①令其回复1点体力并摸两张牌。②你摸三张牌，然后交给其两张手牌。",
	bihuo: "避祸",
	bihuo_info: "限定技。一名角色脱离濒死状态时，你可以令其摸三张牌，然后其他角色计算至其的距离时+X直到本轮结束（X为角色数）。",
	sunhanhua: "手杀孙寒华",
	sunhanhua_prefix: "手杀",
	chongxu: "冲虚",
	chongxu_info: "出牌阶段限一次，你可以随机演奏一首音乐，并根据完成度来获得相应的分数（至多五分）。然后你可修改〖妙剑〗或〖莲华〗（消耗3分），并使用剩余的分数进行摸牌（每张2分）。",
	chongxu_faq: "目前的曲库",
	chongxu_faq_info: "　<br>《鸟之诗》- 折户伸治<br>《竹取飛翔　～ Lunatic Princess》- ZUN<br>《ignotus》- ak+q<br>《Super Mario 3D World Theme》- 横田真人<br>《只因你太美》- SWIN-S<br>《Croatian Rhapsody》- Maksim<br>《罗刹海市》- 刀郎<br>《Pigstep (Stereo Mix)》- Lena Raine",
	miaojian: "妙剑",
	miaojian_info: "出牌阶段限一次。你可将一张【杀】当做刺【杀】使用，或将一张锦囊牌当做【无中生有】使用。",
	miaojian1: "妙剑·改",
	miaojian1_info: "出牌阶段限一次。你可将一张基本牌当做刺【杀】使用，或将一张非基本牌当做【无中生有】使用。",
	miaojian2: "妙剑·极",
	miaojian2_info: "出牌阶段限一次。你可视为使用一张刺【杀】或【无中生有】。",
	shhlianhua: "莲华",
	shhlianhua_info: "当你成为【杀】的目标后，你摸一张牌。",
	shhlianhua1: "莲华·改",
	shhlianhua1_info: "当你成为【杀】的目标后，你摸一张牌。然后你进行判定，若结果为黑桃，则此【杀】对你无效。",
	shhlianhua2: "莲华·极",
	shhlianhua2_info: "当你成为【杀】的目标后，你摸一张牌。然后此【杀】的使用者选择一项：①弃置一张牌。②令此【杀】对你无效。",
	re_yufan: "手杀界虞翻",
	re_yufan_prefix: "手杀界",
	rezongxuan: "纵玄",
	rezongxuan_place: "纵玄",
	rezongxuan_info: "当你的牌因弃置而进入弃牌堆后，你可以将其以任意顺序置于牌堆顶。出牌阶段限一次，你可以摸一张牌，然后将一张牌置于牌堆顶。",
	yj_huangzhong: "☆黄忠",
	yj_huangzhong_prefix: "☆",
	spshidi: "势敌",
	spshidi_info: "转换技，锁定技。①准备阶段/结束阶段开始时，若你发动此分支的累计次数为奇数/偶数，则你获得一个“☯”。②若你的“☯”数为偶数，则你至其他角色的距离-1，且你使用的黑色【杀】不可被响应。③若你的“☯”数为奇数，则其他角色至你的距离+1，且你不可响应红色【杀】。",
	spyishi: "义释",
	spyishi_info: "当你对装备区有牌的其他角色造成伤害时，你可令此伤害-1，然后获得其装备区内的一张牌。",
	spqishe: "骑射",
	spqishe_info: "你可以将一张装备牌当做【酒】使用。你的手牌上限+X（X为你装备区内的牌数）。",
	sp_maojie: "毛玠",
	bingqing: "秉清",
	bingqing_info: "当你于出牌阶段内使用的牌结算结束后，若你于本阶段内使用的所有已结算结束的其他牌与此牌花色均不相同，则你可根据X的值执行对应效果：为2，你令一名角色摸两张牌；为3，你弃置一名角色区域内的一张牌；为4，你对一名其他角色造成1点伤害。（X为你本阶段内使用过的已结算结束的牌中包含的花色数）",
	yingfeng: "迎奉",
	yingfeng_info: "准备阶段，你可以令一名角色获得“奉”标记并移除场上所有其他的“奉”标记。有“奉”标记的角色使用牌没有距离限制。",
	xin_sunxiu: "手杀界孙休",
	xin_sunxiu_prefix: "手杀界",
	mobileyanzhu: "宴诛",
	mobileyanzhu_info: "出牌阶段限一次，你可以令一名有牌的其他角色选择一项：①你获得其装备区里所有的牌，然后你失去技能〖宴诛〗并修改技能〖兴学〗。②你获得其区域里的一张牌。",
	mobilexingxue: "兴学",
	mobilexingxue_info: "结束阶段开始时，你可以令至多X名角色依次摸一张牌并将一张牌置于牌堆顶（X为你的体力值）。",
	mobilexingxuex: "兴学·改",
	mobilexingxuex_info: "结束阶段开始时，你可以令至多X名角色依次摸一张牌并将一张牌置于牌堆顶或交给一名其他目标角色（X为你的体力上限）。",
	re_wuguotai: "手杀界吴国太",
	re_wuguotai_prefix: "手杀界",
	reganlu: "甘露",
	reganlu_info: "出牌阶段限一次，你可以选择装备区牌数之差的绝对值不大于X的两名角色或包含你在内的两名角色，然后交换这两名角色装备区内的牌。（X为你已损失的体力值）",
	taoqian: "手杀陶谦",
	taoqian_prefix: "手杀",
	miheng: "手杀祢衡",
	miheng_prefix: "手杀",
	re_gaoshun: "手杀界高顺",
	re_gaoshun_prefix: "手杀界",
	peixiu: "手杀裴秀",
	peixiu_prefix: "手杀",
	xingtu: "行图",
	xingtu1: "倍数",
	xingtu2: "约数",
	xingtu_info: "锁定技。你使用点数为X的倍数的牌无次数限制，你使用点数为X的约数的牌时摸一张牌（X为你本局游戏使用的上一张牌的点数）。",
	juezhi: "爵制",
	juezhi_info: "出牌阶段，你可以弃置至少两张牌，然后从牌堆中获得一张点数为Y的牌（Y为这些牌的点数和对13取余，余数为0时Y取13）。",
	sp_jianggan: "手杀蒋干",
	sp_jianggan_prefix: "手杀",
	spdaoshu: "盗书",
	spdaoshu_info: "每轮限一次。一名敌方角色的出牌阶段开始时，若其有手牌，则你可以令其视为使用一张【酒】。其须声明一个基本牌的牌名，然后你判断其手牌区内是否有该牌名的牌。若你判断正确，则你获得其两张手牌。",
	spdaoshu_info_identity: "每轮限一次。一名其他角色的出牌阶段开始时，若其有手牌，则你可以令其视为使用一张【酒】。其须声明一个基本牌的牌名，然后你判断其手牌区内是否有该牌名的牌。若你判断正确，则你获得其两张手牌。",
	spdaoshu_info_guozhan: "每轮限一次。一名其他角色的出牌阶段开始时，若其有手牌，则你可以令其视为使用一张【酒】。其须声明一个基本牌的牌名，然后你判断其手牌区内是否有该牌名的牌。若你判断正确，则你获得其两张手牌。",
	mbdaoshu: "盗书",
	mbdaoshu_info: "出牌阶段限一次，你可以选择一名手牌数大于两张的其他角色，其随机获得三个牌名并将一张手牌的牌名伪装成其中一个与原牌名不同的牌名，然后你和队友观看其手牌并猜测其伪装的手牌，猜对的角色对其造成1点伤害，猜错的角色随机弃置两张手牌（手牌数不足两张则改为失去1点体力）。",
	mbdaoshu_info_identity: "出牌阶段限一次，你可以选择一名手牌数大于两张的其他角色，其随机获得三个牌名并将一张手牌的牌名伪装成其中一个与原牌名不同的牌名，然后你观看其手牌并猜测其伪装的手牌。若猜中，你对其造成1点伤害；若猜错，你随机弃置两张手牌（手牌数不足两张则改为失去1点体力）。",
	mbdaoshu_info_guozhan: "出牌阶段限一次，你可以选择一名手牌数大于两张的其他角色，其随机获得三个牌名并将一张手牌的牌名伪装成其中一个与原牌名不同的牌名，然后你观看其手牌并猜测其伪装的手牌。若猜中，你对其造成1点伤害；若猜错，你随机弃置两张手牌（手牌数不足两张则改为失去1点体力）。",
	spdaizui: "戴罪",
	spdaizui2: "戴罪",
	spdaizui_info: "限定技。当你受到伤害值不小于体力值的伤害时，你可防止此伤害并将此伤害渠道对应的所有实体牌置于伤害来源的武将牌上，称为“释”。本回合结束时，其获得所有“释”。",
	re_caiwenji: "手杀界蔡琰",
	re_caiwenji_prefix: "手杀界",
	re_bulianshi: "手杀界步练师",
	re_bulianshi_prefix: "手杀界",
	reanxu: "安恤",
	reanxu_info: "出牌阶段限一次，你可以选择两名其他角色，令其中一名角色获得另一名角色的一张牌。若以此法移动的牌不来自装备区，则你摸一张牌。然后你可以令二者中手牌数较少的一名角色摸一张牌。",
	xin_jushou: "手杀界沮授",
	xin_jushou_prefix: "手杀界",
	xinjianying: "渐营",
	xinjianying_info: "①当你于出牌阶段内使用与此阶段你使用的上一张牌点数或花色相同的牌时，你可以摸一张牌。②出牌阶段限一次，你可以将一张牌当做任意基本牌使用。若你于此阶段内使用的上一张牌有花色，则此牌的花色视为上一张牌的花色。",
	re_xunyu: "手杀界荀彧",
	re_xunyu_prefix: "手杀界",
	rejieming: "节命",
	rejieming_info: "当你受到1点伤害后，你可以令一名角色摸两张牌。然后若其手牌数小于体力上限，则你摸一张牌。",
	xin_quancong: "手杀界全琮",
	xin_quancong_prefix: "手杀界",
	sbyaoming: "邀名",
	sbyaoming_info: "蓄力技（2/4）。①当你受到1点伤害后，你可以获得1点蓄力值。②出牌阶段或当你受到伤害后，你可消耗1点蓄力值并选择一项：⒈弃置一名手牌数不小于你的角色的一张牌。⒉令一名手牌数不大于你的角色摸一张牌。若你上次发动〖邀名②〗时未获得过蓄力值且你选择的选项和上次不同，则你获得1点蓄力值。",
	ruanhui: "阮慧",
	mingcha: "明察",
	mingcha_info: "摸牌阶段开始时，你亮出牌堆顶的三张牌。若这三张牌中有点数小于9的牌，则你可以放弃摸牌并获得这些牌，然后你可以获得一名其他角色的随机一张牌。",
	jingzhong: "敬重",
	jingzhong_info: "弃牌阶段结束时，若你于本阶段内弃置过至少两张黑色牌，则你可以选择一名其他角色并获得如下效果直到其回合结束：每阶段限三次，其于出牌阶段内使用的牌结算结束后，你获得此牌对应的实体牌。",
	xin_mamidi: "手杀马日磾",
	xin_mamidi_prefix: "手杀",
	chengye: "承业",
	chengye_info: "锁定技。①其他角色使用的非转化牌结算结束后，或其他角色的装备牌和延时锦囊牌进入弃牌堆后，或有延时锦囊牌因其他角色执行判定阶段的流程而进入弃牌堆后，若你的“六经”有空缺的位置可以置入此牌，则你将此牌置于你武将牌上，填补“六经”的对应位置。②出牌阶段开始时，若你的“六经”没有空缺的位置，则你获得所有“六经”。",
	chengye_append: '<span style="font-family:yuanli"><li>《诗经》：伤害类锦囊牌<br><li>《尚书》：基本牌<br><li>《仪礼》：无懈可击<br><li>《易经》：无中生有<br><li>《乐经》：乐不思蜀<br><li>《春秋》：装备牌</span>',
	buxu: "补叙",
	buxu_backup: "补叙",
	buxu_info: "出牌阶段，若你的“六经”中有空缺的位置，则你可以弃置X+1张牌并选择一种空缺的“六经”（X为你本阶段内发动过〖补叙〗的次数）。系统从牌堆或弃牌堆中检索一张对应的牌，然后你将此牌置于你武将牌上，填补“六经”的对应位置。",
	re_dianwei: "手杀界典韦",
	re_dianwei_prefix: "手杀界",
	liuye: "手杀刘晔",
	liuye_prefix: "手杀",
	sp_caosong: "手杀曹嵩",
	sp_caosong_prefix: "手杀",
	yijin: "亿金",
	yijin_info: "锁定技。①游戏开始时，你获得“膴仕”、“金迷”、“贾凶”、“通神”、“拥蔽”、“厚任”各1枚（均称为“金”）。②出牌阶段开始时，你选择一名没有“金”的其他角色。你交给其1枚“金”，且令其获得对应效果。③一名角色的回合结束后，若其有你交给其的“金”，其移去此“金”。④当你死亡时，移去场上所有你交出的“金”。⑤回合开始时，若你没有“金”，你死亡。",
	yijin_wushi: "膴仕",
	yijin_wushi_info: "锁定技。①摸牌阶段，你多摸四张牌。②你使用【杀】的次数上限+1。",
	yijin_jinmi: "金迷",
	yijin_jinmi_info: "锁定技。回合开始时，你跳过下一个出牌阶段和弃牌阶段。",
	yijin_guxiong: "贾凶",
	yijin_guxiong_info: "锁定技。①出牌阶段开始时，你失去1点体力。②你的手牌上限-3。",
	yijin_tongshen: "通神",
	yijin_tongshen_info: "锁定技。当你受到非雷电伤害时，防止之。",
	yijin_yongbi: "拥蔽",
	yijin_yongbi_info: "锁定技。准备阶段，你跳过下一个摸牌阶段。",
	yijin_houren: "厚任",
	yijin_houren_info: "锁定技。回合结束时，你回复3点体力。",
	guanzong: "惯纵",
	guanzong_info: "出牌阶段限一次。你可以令一名其他角色视为对另一名其他角色造成过1点伤害。",
	yangfu: "杨阜",
	jiebing: "借兵",
	jiebing_info: "锁定技。当你受到伤害后，你选择来源外的一名其他角色，随机获得其一张牌并展示。若此牌为装备牌，你使用之。",
	hannan: "扞难",
	hannan_info: "出牌阶段限一次。你可以与一名角色拼点，赢的角色对没赢的角色造成2点伤害。",
	xin_wuyi: "手杀界吴懿",
	xin_wuyi_prefix: "手杀界",
	sbbenxi: "奔袭",
	sbbenxi_info: "出牌阶段开始时，你可以弃置至少一张牌，然后你于此阶段获得如下效果：①你至其他角色距离-X；②当你使用的下一张基本牌或普通锦囊牌A选择目标后，你可以额外指定X名距离为1的角色为目标；③牌A结算结束后，若此牌造成过伤害，你摸五张牌（X为你以此法弃置的牌数）。",
	xin_zhuzhi: "手杀界朱治",
	xin_zhuzhi_prefix: "手杀界",
	sbanguo: "安国",
	sbanguo_info: "①游戏开始时，你令一名其他角色获得1枚“安国”标记（有“安国”的角色手牌上限基数等于体力上限）。②出牌阶段开始时，你可以将一名有“安国”的角色的所有“安国”移动给一名本局游戏未获得过“安国”的其他角色。③当你受到伤害时，若有有“安国”的角色且伤害值不小于你的体力值且此伤害没有来源或来源没有“安国”，防止此伤害。④一名角色进入濒死状态时，若其有你因〖安国①〗获得的“安国”，你移去其该“安国”，令其将体力回复至1点。然后你选择一项：1.若你的体力值大于1，你失去体力至1点；2.若你的体力上限大于1，你将体力上限减至1。最后你令其获得1点护甲。",
	wangjun: "手杀王濬",
	wangjun_prefix: "手杀",
	zhujian: "筑舰",
	zhujian_info: "出牌阶段限一次。你可以令至少两名装备区里有牌的角色各摸一张牌。",
	duansuo: "断索",
	duansuo_info: "出牌阶段限一次。你可以重置任意名处于连环状态的角色，然后对这些角色各造成1点火焰伤害。",
	sp_pengyang: "手杀彭羕",
	sp_pengyang_prefix: "手杀",
	spdaming: "达命",
	spdaming_info: "①游戏开始时，你获得1点“达命”值。②其他角色A的出牌阶段限一次。其可以交给你一张牌，然后你选择另一名其他角色B。若B有与此牌相同类型的牌，其将一张该类型的牌交给A，你获得1点“达命”值；否则你将此牌交给A。",
	spxiaoni: "嚣逆",
	spxiaoni_info: "①出牌阶段限一次。若你的“达命”值大于0，你可以将一张牌当任意一种【杀】或伤害类锦囊牌使用。然后你减少等同于此牌指定目标数的“达命”值。②你的手牌上限基数为X（X为“达命”值，且至多为你的体力值，至少为0）。",
	xin_zhuhuan: "手杀界朱桓",
	xin_zhuhuan_prefix: "手杀界",
	xinpingkou: "平寇",
	xinpingkou_info: "回合结束时，你可以对至多X名其他角色各造成1点伤害（X为你本回合跳过的阶段数）。然后你从牌堆中获得一张装备牌。",
	xin_caoxiu: "手杀界曹休",
	xin_caoxiu_prefix: "手杀界",
	xinqingxi: "倾袭",
	xinqingxi_info: "每回合限一次。当你对其他角色造成伤害时，你可以令其选择一项：1.弃置X张手牌（X为4减去你至其的距离，至少为1）；2.令此伤害+1。",
	yj_weiyan: "☆魏延",
	yj_weiyan_prefix: "☆",
	mbguli: "孤厉",
	mbguli_info: "出牌阶段限一次。你可以将所有手牌当做一张无视防具的【杀】使用。此牌结算结束后，若此牌造成过伤害，你可以失去1点体力并将手牌摸至X张（X为你的体力上限）。",
	mbaosi: "骜肆",
	mbaosi_info: "锁定技。当你于出牌阶段对一名攻击范围内的角色造成伤害后，你于此阶段对其使用牌无次数限制。",
	xin_zhoutai: "手杀界周泰",
	xin_zhoutai_prefix: "手杀界",
	re_yanwen: "手杀界颜良文丑",
	re_yanwen_prefix: "手杀界",
	qianzhao: "手杀牵招",
	qianzhao_prefix: "手杀",
	mbshihe: "势吓",
	mbshihe_info_identity: "出牌阶段限一次。你可以与一名角色拼点。若你：赢，当其于其下回合结束前对你造成伤害时，取消之；没赢，你随机弃置一张牌。",
	mbshihe_info: "出牌阶段限一次。你可以与一名角色拼点。若你：赢，当其于其下回合结束前对你和你的友方角色造成伤害时，取消之；没赢，你随机弃置一张牌。",
	mbzhenfu: "镇抚",
	mbzhenfu_info: "结束阶段，若你本回合因弃置失去过牌，你可以令一名其他角色获得1点护甲。",
	shichangshi: "十常侍",
	mbdanggu: "党锢",
	mbdanggu_info: "锁定技。①游戏开始时，你获得十张“常侍”牌，然后你进行一次结党。②当你修整结束后，你进行一次结党并摸一张牌。③若你有亮出的“常侍”牌，你视为拥有这些牌的技能。",
	mbdanggu_faq: "关于结党",
	mbdanggu_faq_info: "<br>系统随机选择一张未亮出过的“常侍”牌，然后选择四张未亮出过的“常侍”牌。你观看前者，然后从后者中选择一名认可前者的“常侍”牌。然后若此时不为双将模式，你将这两张武将牌作为你的武将牌（不移除原有技能）；否则你获得这两张武将牌上的技能。",
	mbdanggu_faq2: "关于认可",
	mbdanggu_faq2_info: "<br>双向不认可常侍为固定组合：<br><li>郭胜、段珪<br><li>韩悝、毕岚<br>单向不认可常侍为系统随机分配。<br>每次结党至多存在一张不认可主将的常侍牌，且若此次结党仅有一张常侍牌，则不会存在不认可情况。",
	mbmowang: "殁亡",
	mbmowang_info: "锁定技。①当你死亡前，若你有未亮出的“常侍”牌且体力上限大于0，你将死亡改为修整至你的下个回合开始前，然后你复原武将牌，且不于此次死亡事件中进行展示身份牌、检测游戏胜利条件与执行奖惩的流程。②回合结束后，你死亡。",
	mbmowang_faq: "关于修整",
	mbmowang_faq_info: "<br>将武将牌移出游戏（视为你存活）。当该角色修整结束，其移回游戏。",
	scs_zhangrang: "张让",
	scstaoluan: "滔乱",
	scstaoluan_info: "出牌阶段限一次。你可以将一张牌当任意一种基本牌或普通锦囊牌使用。",
	scs_zhaozhong: "赵忠",
	scschiyan: "鸱咽",
	scschiyan_info: "①当你使用【杀】指定目标后，你可以将其的一张牌置于其武将牌上，然后其于当前回合结束时获得这些牌。②当你因执行【杀】的效果对一名角色造成伤害时，若该角色的手牌数和装备区内的牌数均不大于你，此伤害+1。",
	scs_sunzhang: "孙璋",
	scszimou: "自谋",
	scszimou_info: "锁定技。出牌阶段，当你使用第二/四/六张牌时，你从牌堆中获得一张【酒】/【杀】/【决斗】。",
	scs_bilan: "毕岚",
	scspicai: "庀材",
	scspicai_info: "出牌阶段限一次。你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同，则你可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。",
	scs_xiayun: "夏恽",
	scsyaozhuo: "谣诼",
	scsyaozhuo_info: "出牌阶段限一次。你可以与一名角色拼点，若你赢，其跳过下一个摸牌阶段；若你没赢，你弃置两张牌。",
	scs_hankui: "韩悝",
	scsxiaolu: "宵赂",
	scsxiaolu_info: "出牌阶段限一次。你可以摸两张牌，然后选择一项：1.弃置两张牌；2.将两张牌交给一名其他角色。",
	scs_lisong: "栗嵩",
	scskuiji: "窥机",
	scskuiji_info: "出牌阶段限一次。你可以观看一名其他角色的手牌，然后弃置你与其的共计四张花色各不相同的手牌。",
	scs_duangui: "段珪",
	scschihe: "叱吓",
	scschihe_info: "当你使用【杀】指定唯一目标后，你可亮出牌堆顶的两张牌，令此【杀】的伤害值基数+X（X为亮出牌中花色与此【杀】相同的牌数），且目标角色不能使用亮出牌包含的花色的牌响应此【杀】。",
	scs_guosheng: "郭胜",
	scsniqu: "逆取",
	scsniqu_info: "出牌阶段限一次。你可以对一名角色造成1点火焰伤害。",
	scs_gaowang: "高望",
	scsanruo: "安弱",
	scsanruo_info: "你可以将一张♥牌当【桃】、♦牌当火【杀】、♣牌当【闪】、♠牌当【无懈可击】使用。当你以此法使用或打出【杀】或【闪】时，你可以获得对方的一张牌；当你以此法使用【桃】时，你可以获得一名其他角色的一张牌；当你以此法使用【无懈可击】时，你可以获得此牌响应的普通锦囊牌的使用者的一张牌。",
	scsmiaoyu: "妙语",
	scsmiaoyu_info: "你可以将至多两张相同花色的牌按照以下规则使用或打出：♦牌当作火【杀】，♥牌当作【桃】，♣牌当作【闪】，♠牌当作【无懈可击】。若你以此法使用了两张红色牌，则此牌回复值或伤害值+1。若你以此法使用了两张黑色牌，则你弃置当前回合角色一张牌。",
	re_xiaoqiao: "手杀界小乔",
	re_xiaoqiao_prefix: "手杀界",
	xin_sunliang: "手杀孙亮",
	xin_sunliang_prefix: "手杀",
	xinkuizhu: "溃诛",
	xinkuizhu_info: "弃牌阶段结束后，你可以选择一项：1.令至多X名角色各摸一张牌。2.对任意名体力值之和为X的角色造成1点伤害，若你以此法选择的角色数不小于2，你失去1点体力。（X为你此阶段弃置的牌数）",
	xinzhizheng: "掣政",
	xinzhizheng_info: "锁定技，你的出牌阶段内，攻击范围内不包含你的其他角色不能成为你使用牌的目标。出牌阶段结束时，若你本阶段内使用的牌数小于这些角色的数量，则你弃置其中一名角色的一张牌。",
	xinlijun: "立军",
	xinlijun_info: "主公技，其他吴势力角色于其回合内使用【杀】结算完毕后，其可以将此【杀】对应的实体牌交给你，然后你可以令其摸一张牌。",
	xin_zhangyi: "手杀界张嶷",
	xin_zhangyi_prefix: "手杀界",
	xinwurong: "怃戎",
	xinwurong_info: "出牌阶段限一次，你可以与一名其他角色进行谋弈：<br><li>若你选择“镇压”且其选择“反抗”，你对其造成1点伤害，然后你摸一张牌。<br><li>若你选择“安抚”且其选择“归顺”，其须交给你两张牌（若其牌数不足两张，则改为令其跳过其下个摸牌阶段）。<br><li>若你选择“镇压”且其选择“归顺”，你获得其一张牌，然后你交给其两张牌。<br><li>若你选择“安抚”且其选择“反抗”，你受到1点伤害，然后你摸两张牌。",
	xin_guozhao: "手杀郭照",
	xin_guozhao_prefix: "手杀",
	yichong: "易宠",
	yichong_info: "①准备阶段，你可以选择一名其他角色并选择一个花色，然后你获得其所有此花色的装备牌和其一张此花色的手牌，移除场上的所有“雀”标记，令其获得“雀”标记直到你的下个回合开始。②拥有“雀”标记的角色获得你最后一次发动〖易宠①〗选择的花色的牌后，你获得这些牌（你至多通过每个“雀”得到一张牌）。",
	wufei: "诬诽",
	wufei_info: "若场上存在拥有“雀”标记的角色A，则：①当你使用【杀】或伤害类锦囊牌指定第一个目标后，你令A成为此牌伤害来源。②当你受到伤害后，若A的体力值大于3，则你可以令A受到1点无来源伤害。",
	yj_zhoubuyi: "☆周不疑",
	yj_zhoubuyi_prefix: "☆",
	mbhuiyao: "慧夭",
	mbhuiyao_info: "出牌阶段限一次。你可以受到1点无来源伤害，然后你选择一名其他角色，令其视为对另一名角色造成过1点伤害。",
	mbquesong: "雀颂",
	mbquesong_info: "一名角色的结束阶段，若你于本回合受到过伤害，你可以令一名角色选择一项：1.摸X张牌并复原武将牌（X为3，若其装备区非宝物牌牌数不小于三张则X为2）；2.回复1点体力。",
	xin_yuanshao: "手杀界袁绍",
	xin_yuanshao_prefix: "手杀界",
	re_baosanniang: "手杀鲍三娘",
	re_baosanniang_prefix: "手杀",
	re_liushan: "手杀界刘禅",
	re_liushan_prefix: "手杀界",
	re_sunben: "界孙笨",
	re_sunben_prefix: "界",
	re_zhangzhang: "手杀界张昭张纮",
	re_zhangzhang_prefix: "手杀界",
	re_caozhi: "手杀界曹植",
	re_caozhi_prefix: "手杀界",
	re_sunjian: "手杀界孙坚",
	re_sunjian_prefix: "手杀界",
	sunru: "手杀孙茹",
	sunru_prefix: "手杀",
	pangdegong: "手杀庞德公",
	pangdegong_prefix: "手杀",
	zhaotongzhaoguang: "手杀赵统赵广",
	zhaotongzhaoguang_prefix: "手杀",
	re_liru: "手杀界李儒",
	re_liru_prefix: "手杀界",
	re_chenqun: "手杀界陈群",
	re_chenqun_prefix: "手杀界",
	old_yuanshu: "手杀袁术",
	old_yuanshu_prefix: "手杀",
	baoxin: "鲍信",
	mutao: "募讨",
	mutao_info: "出牌阶段限一次。你可以选择一名角色，令其将手牌中所有的【杀】置于武将牌上，然后将这些牌依次随机交给其下家开始的每一名角色。然后其对最后一名以此法获得【杀】的角色A造成X点伤害（X为A手牌中【杀】的数量且至多为2）。",
	yimou: "毅谋",
	yimou_info: "当一名角色受到伤害后，若其存活且你至其的距离不大于1，你可以选择一项：1.令其从牌堆中获得一张【杀】；2.令其将一张手牌交给另一名角色，然后摸一张牌。",
	jiangji: "手杀蒋济",
	jiangji_prefix: "手杀",
	jilun: "机论",
	jilun_info: "①当你受到伤害后，若你拥有技能〖急筹〗，则你可以一项：1.摸两张牌。2.获得1枚“机论”标记。②一名角色的结束阶段，若你拥有“机论”，则重复选择执行以下项直到你没有“机论”标记：1.失去1枚“机论”标记，视为使用一张〖急筹①〗记录过且未被〖机论②〗记录过的普通锦囊牌并记录此牌牌名。2.失去所有“机论”标记。",
	liwei: "李遗",
	jiaohua: "教化",
	jiaohua_backup: "教化",
	jiaohua_info: "出牌阶段限两次，你可以选择一个未被〖教化〗记录过的牌的类型，令一名角色从牌堆中获得一张此类型的牌，然后记录此类型，若基本、锦囊、装备均已被你发动〖教化〗记录，则你清空〖教化〗记录。",
	laimin: "来敏",
	laishou: "来寿",
	laishou_info: "锁定技。①当你受到伤害值大于等于你的体力值的伤害时，若你的体力上限小于9，你防止此伤害并增加等量体力上限。②准备阶段，若你的体力上限不小于9，你死亡。",
	luanqun: "乱群",
	luanqun_info: "出牌阶段限一次，若你有手牌，则你可以令所有有手牌的角色同时展示一张手牌，然后你可以获得其中一张与你展示的牌颜色相同的展示牌，所有本次展示牌颜色与你展示的牌颜色不同的角色的下个出牌阶段使用的第一张【杀】只能对你使用，且此【杀】不可被响应。",
	xin_wuban: "吴班",
	xinjintao: "进讨",
	xinjintao_info: "锁定技，你使用【杀】无距离限制且次数上限+1。你于出牌阶段内使用的第一张【杀】不可被响应，第二张【杀】伤害+1。",
	xinlianhuan: "连环",
	xinlianhuan_info: "你可以将一张♣手牌当【铁索连环】使用或重铸。你使用【铁索连环】选择目标后，可以给此牌增加一个目标。",
	mb_sunluyu: "手杀孙鲁育",
	mb_sunluyu_prefix: "手杀",
	mbmumu: "穆穆",
	mbmumu_info: "出牌阶段开始时，你可以选择一项：1.弃置场上的一张装备牌；2.获得场上的一张防具牌，然后你本回合不能使用或打出【杀】。",
	mbmeibu: "魅步",
	mbmeibu_info: "其他角色的出牌阶段开始时，若你在其攻击范围内，你可以弃置一张牌，令该角色于本回合内获得〖止息〗。若你以此法弃置的牌不是【杀】或黑色锦囊牌，则本回合其与你的距离视为1。",
	mbzhixi: "止息",
	mbzhixi_info: "锁定技。出牌阶段，若你于此阶段使用过的牌数不小于X，你不能使用牌（X为你的体力值）；当你使用锦囊牌时，你结束此阶段。",
	yanxiang: "阎象",
	kujian: "苦谏",
	kujian_info: "出牌阶段限一次，你可以将至多两张手牌称为“谏”并交给一名其他角色，然后你获得以下效果：当其他角色使用或打出牌后，若其中有“谏”，你与其各摸两张牌；当其他角色不因使用或打出而失去牌后，若其中有“谏”，你与其各弃置一张牌。",
	mb_xianglang: "手杀向朗",
	mb_xianglang_prefix: "手杀",
	naxue: "纳学",
	naxue_info: "你可以跳过出牌阶段。若如此做，你可以弃置任意张牌并摸等量的牌，然后你可以交给至多两名其他角色各一张手牌。",
	yijie: "遗诫",
	yijie_info: "锁定技。当你死亡时，你令所有其他角色将体力回复或失去至X（X为所有其他角色的体力之和除以所有其他角色数，向下取整，且X至少为1）。",
	mb_chengui: "手杀陈珪",
	mb_chengui_prefix: "手杀",
	guimou: "诡谋",
	guimou_info: "锁定技。游戏开始时/回合结束时，你随机/须选择以下一项直到你的下个准备阶段：①记录场上期间角色使用牌数；②记录期间场上角色弃置牌数；③记录期间场上角色获得牌数。准备阶段，你可以选择一名场上对应记录数值最少的其他角色，观看其手牌并选择其中一张牌，然后你将此牌交给另一名其他角色或弃置此牌。",
	zhouxian: "州贤",
	zhouxian_info: "锁定技。当你成为其他角色使用的伤害类卡牌的目标后，你亮出牌堆顶的三张牌，然后其须选择一项：①弃置一张与亮出牌之一类别相同的牌；②令此牌对你无效。",
	mb_huban: "手杀胡班",
	mb_huban_prefix: "手杀",
	mbyilie: "义烈",
	mbyilie2: "义烈",
	mbyilie3: "义烈",
	mbyilie_info: "锁定技。①游戏开始时，你选择一名其他角色，然后你获得以下效果：其受到伤害时，若你没有“烈”，则你获得等同于伤害值的“烈”标记，然后防止此伤害；其对其他角色造成伤害后，你回复1点体力。②结束阶段，若你拥有“烈”标记，你摸一张牌并失去X点体力，然后移去所有“烈”（X为你拥有的“烈”标记数）。",
	muludawang: "木鹿大王",
	shoufa: "兽法",
	shoufa_info: "当你受到伤害后/于一回合首次造成伤害后，你可以选择一名与你距离大于/不大于2的角色，令其随机执行以下一项：豹，令其受到1点无来源伤害；鹰，你随机获得其一张牌；熊，你随机弃置其装备区的一张牌；兔，令其摸一张牌。",
	shoufa_info_doudizhu: "当你受到伤害后/于一回合首次造成伤害后，你可以选择一名与你距离大于/不大于1的角色，令其随机执行以下一项：豹，令其受到1点无来源伤害；鹰，你随机获得其一张牌；熊，你随机弃置其装备区的一张牌；兔，令其摸一张牌。",
	yuxiang: "御象",
	yuxiang_info: "锁定技，若你有护甲值，则：①你计算与其他角色的距离-1，其他角色计算与你的距离+1；②当你受到火焰伤害时，此伤害+1。",
	zhoulin: "咒鳞",
	zhoulin_info: "限定技，出牌阶段，你可以获得2点护甲值，然后选择一个“兽法”效果，你发动〖兽法〗的执行效果改为你选择的效果直到你的下个回合结束。",
	xin_huojun: "手杀霍峻",
	xin_huojun_prefix: "手杀",
	sidai: "伺怠",
	sidai_info: "限定技，出牌阶段，你可以将手牌区内的所有基本牌当做【杀】使用。若此牌对应的实体牌中：包含【闪】，则目标角色成为此牌的目标后，需弃置一张基本牌，否则不可响应此牌；包含【桃】，则当目标角色受到此牌的伤害后，其减1点体力上限。",
	jieyu: "竭御",
	jieyu_info: "结束阶段，你可以从弃牌堆中获得共X张不同牌名的基本牌（X为4-你上次发动〖竭御〗至今你成为其他角色使用伤害类卡牌目标的次数，且X至少为1）。",
	jieyu_info_identity: "结束阶段，你可以从弃牌堆中获得共X张不同牌名的基本牌（X为3-你上次发动〖竭御〗至今你成为其他角色使用伤害类卡牌目标的次数，且X至少为1）。",
	yangfeng: "杨奉",
	mbxuetu: "血途",
	mbxuetu_info: "转换技。出牌阶段限一次，阴：你可以令一名角色回复1点体力；阳：你可以令一名角色摸两张牌。",
	mbxuetu_achieve: "血途·成功",
	mbxuetu_achieve_info: "出牌阶段各限一次。⒈你可以令一名角色回复1点体力；⒉你可以令一名角色摸两张牌。",
	mbxuetu_fail: "血途·失败",
	mbxuetu_fail_info: "转换技。出牌阶段限一次，阴：你可以回复1点体力，然后令一名角色弃置两张牌；阳：你可以摸一张牌，然后对一名角色造成1点伤害。",
	mbweiming: "威命",
	mbweiming_info: "使命技，锁定技。①出牌阶段开始时，你记录一名未以此法记录过的角色。②成功：当你杀死一名未被〖威命①〗记录过的角色后，修改〖血途〗为成功版本。③失败：当一名被〖威命①〗记录过的角色死亡后，你修改〖血途〗为失败版本。",
	lizhaojiaobo: "李昭焦伯",
	mbzuoyou: "佐佑",
	mbzuoyou_info: "转换技。出牌阶段限一次，阴：你可以令一名角色摸两张牌，然后其弃置一张手牌；阳：你可以令一名手牌数不少于二的角色弃置两张手牌，然后其获得1点护甲。",
	mbshishou: "侍守",
	mbshishou_info: "锁定技。当你发动〖佐佑〗后，若目标角色不为你，你执行〖佐佑〗中目标角色未执行的一项。",
	chengji: "成济",
	mbkuangli: "狂戾",
	mbkuangli_info: "锁定技。①出牌阶段开始时，你随机令场上任意名其他角色获得“狂戾”标记。②出牌阶段限两次。当你使用牌指定有“狂戾”的角色为目标后，你与其各随机弃置一张牌，然后你摸一张牌。③回合结束时，你移除所有角色的“狂戾”。",
	mbxiongsi: "凶肆",
	mbxiongsi_info: "限定技。出牌阶段，若你的手牌数不少于三张，你可以弃置所有手牌，然后令所有其他角色依次失去1点体力。",
	mb_sp_guanqiujian: "SP毌丘俭",
	mb_sp_guanqiujian_prefix: "SP",
	mbcuizhen: "摧阵",
	mbcuizhen_info_identity: "①游戏开始时，你可以废除至多两名其他角色的武器栏。②当你于出牌阶段使用伤害类牌指定其他角色为目标后，若目标角色的手牌数不小于体力值，你可以废除其武器栏。③摸牌阶段，你令额定摸牌数+X（X为所有角色被废除的武器栏数之和，至多为2）。",
	mbcuizhen_info: "①当你于出牌阶段使用伤害类牌指定其他角色为目标后，若目标角色的手牌数不小于体力值，你可以废除其武器栏。②摸牌阶段，你令额定摸牌数+X（X为所有角色被废除的武器栏数之和，至多为2）。",
	mbkuili: "溃离",
	mbkuili_info: "锁定技。当你受到伤害后，你弃置等同于伤害值的手牌；若来源有被废除的武器栏，你令其恢复武器栏。",
	mb_caomao: "手杀曹髦",
	mb_caomao_prefix: "手杀",
	mbqianlong: "潜龙",
	mbqianlong_info: "①游戏开始时，你获得20枚“道心”标记。②当你得到牌后/受到1点伤害后/造成1点伤害后，你获得5/10/15枚“道心”（上限为100枚）。③若你的“道心”数不小于25/50/75/100，你视为拥有〖清正〗/〖酒诗〗/〖放逐〗/〖决进〗。",
	mbcmqingzheng: "清正",
	mbcmqingzheng_info: "出牌阶段开始时，你可以弃置两种花色的所有手牌，并观看一名有手牌的其他角色的手牌，你弃置其中一种花色的所有牌。若其被弃置的牌数小于你以此法弃置的牌数，你对其造成1点伤害。",
	mbcmjiushi: "酒诗",
	mbcmjiushi_info: "①当你需要使用【酒】时，若你的武将牌正面向上，你可以翻面，视为使用一张【酒】。②当你受到伤害后，若你的武将牌背面向上，你可以翻面。③当你翻面后，你获得牌堆里的一张锦囊牌。",
	mbcmfangzhu: "放逐",
	mbcmfangzhu_info: "出牌阶段限一次。你可以选择一名其他角色，选择一项：⒈令其不能使用手牌中的非锦囊牌直到其回合结束；⒉令其所有非Charlotte技能失效直到其回合结束。",
	mbjuejin: "决进",
	mbjuejin_info: "限定技。出牌阶段，你可以令所有角色依次将体力回复或失去至1并获得X点护甲（X为一名角色以此法变化的体力值）。然后你增加如下“向死存魏”的全局技能：当有牌进入弃牌堆后，系统将这些牌中的【闪】、【桃】和【酒】移出游戏。",
	mbweitong: "卫统",
	mbweitong_info: "主公技。游戏开始时，若你有〖潜龙〗，你获得20X枚“道心”（X为其他魏势力角色数）。",
	mb_simafu: "手杀司马孚",
	mb_simafu_prefix: "手杀",
	mbpanxiang: "蹒襄",
	mbpanxiang_info: "当一名角色受到伤害时，你可以选择一项（不能与上次你因其发动此技能时选择的选项相同）：⒈令此伤害-1，伤害来源摸两张牌；⒉令此伤害+1，其摸三张牌。",
	mbchenjie: "臣节",
	mbchenjie_info: "锁定技。当一名角色死亡后，若你有〖蹒襄〗且其成为过你〖蹒襄〗的目标，你弃置区域里的所有牌，摸四张牌。",
};

export default translates;
