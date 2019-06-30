/** 
 * https://juejin.im/post/5d157bf3f265da1bcc1954e6
 * 
 * 关于git的一些内容
 */

/** 
 * 安装Git
 * 
 * $git config --global user.name 'kisure'
 * $git config --global user.emial 'zttaijue1207@163.com'
 * 
 * global表示全局，这台机器所有的Git仓库都会使用这个配置。允许单个仓库使用其他的名字和邮箱。
 */

/** 
 * 仓库
 * 
 * 本地仓库 = 工作区 + 版本区
 * 工作区即磁盘上的文件集合
 * 版本区(版本库)即.git文件
 * 版本库 = 暂存区(stage) + 分支(master) + 指针Head
 * 
 * (1) git init 原本本地仓库只包含着工作区，这是最常见的工作状态
 *      此时，git init一下，表示在本地区域创建了一个.git文件,版本区建立。
 * (2) git add . 表示把工作区的所有文件全部提交到版本区里面的暂存区。
 * (3) 当然你也可以通过 git add ./xxx/ 一条一条分批添加到暂存区。
 * (4) git commit -m "xxx" 把暂存区的所有文件提交到仓库区，暂存区空空荡荡。
 * (5) git remote add origin https://github.com/name/name_cangku.git 把本地仓库与远程仓库连接起来。
 * (6) git push origin master 把仓库区的文件提交到远程仓库里。
 * (7) 一旦提交后，如果你又没有对工作区做任何修改，那么工作区就是“干净”的。
 *      会有这样的信息nothing to commit, working tree clean
 */

/** 
 * 版本的回溯与前进
 * 
 * 提交一个文件，有时候我们会提交很多次，在提交历史中，这样就产生了不同的版本。
 * 每次提交，Git会把他们串成一条时间线。如何回溯到我们提交的上一个版本，用git reset --hard + 版本号即可。 
 * 版本号可以用git log来查看，每一次的版本都会产生不一样的版本号。回溯之后，git log查看一下发现离我们最近的那个版本已经不见了。
 * 但是我还想要前进到最近的版本应该如何？只要git reset --hard + 版本号就行。
 * 退一步来讲，虽然我们可以通过git reset --hard + 版本号,靠记住版本号来可以在不同的版本之间来回穿梭。
 * 但是,有时候把版本号弄丢了怎么办？git reflog帮你记录了每一次的命令，这样就可以找到版本号了，这样你又可以通过git reset来版本穿梭了。
 */

/** 
 * 撤销
 * 
 * 场景1：在工作区时，你修改了一个东西，你想撤销修改，git checkout -- file。
 *       撤销修改就回到和版本库一模一样的状态，即用版本库里的版本替换工作区的版本。
 * 
 * 场景2：你修改了一个内容，并且已经git add到暂存区了。
 *       回溯版本，git reset --hard + 版本号,再git checkout -- file,替换工作区的版本。
 * 
 * 场景3：你修改了一个内容，并且已经git commit到了master。
 *       跟场景2一样，版本回溯，再进行撤销。
 */

/** 
 * 删除
 * 
 * 如果你git add一个文件到暂存区，然后在工作区又把文件删除了，Git会知道你删除了文件。
 *      如果你要把版本库里的文件删除，git rm 并且git commit -m "xxx".
 * 
 * 如果你误删了工作区的文件，怎么办？
 *      使用撤销命令，git checkout --<file>就可以。
 *      这再次证明了撤销命令其实就是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。
 */

/** 
 * 分支
 * 
 * (1) 创建分支other,切换到other分支。
 *      git branch other
 *      git checkout other
 * 
 * (2) 查看当前所有分支
 *      git branch
 * 
 * (3) 将other分支上的代码合并到master分支上
 *      git checkout master
 *      git merge other
 * 
 * (4) 删除other分支
 *      git branch -d other
 */

/** 
 * BUG分支
 * 
 * 工作中每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。
 * 但如果你手上有分支在工作中，你的上级要你改另外的分支的BUG。
 * 你要把现在正在工作的分支保存下来，git stash,把当前工作现场“存储”起来，等以后恢复后继续工作。
 * 当你解决BUG后，git checkout other回到自己的分支。用git stash list查看你刚刚“存放”起来的工作去哪里了。
 * 
 * 此时你要恢复工作：
 * (1) git stash apply恢复却不删除stash内容，git stash drop删除stash内容。
 * (2) git stash pop恢复的同时把stash内容也删了。
 * (3) 此时，用git stash list查看，看不到任何stash 内容。
 * 
 * 总结!!!!：修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；
 *      当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场
 */

/** 
 * 抓取分支
 * 
 * git pull 把最新的提交从远程仓库中抓取下来，在本地合并，解决冲突。
 * 
 * 多人协作的工作模式通常是这样：
 * (1) 首先，可以试图用git push origin <branch-name>推送自己的修改；
 * (2) 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
 * (3) 如果合并有冲突，则解决冲突，并在本地提交；
 * (4) 没有冲突或者解决掉冲突后，再用git push origin <branch-name> 推送就能成功！
 * (5) 如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，
        用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。
 */

/** 
 * Rebase
 * 
 * git rebase 把分叉的提交历史“整理”成一条直线，看上去更直观.缺点是本地的分叉提交已经被修改过了。
 * 最后在进行git push -u origin master
 * rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。
 */

/** 
 * https://www.jianshu.com/p/478d912946df
 * 
 * git pull = git fetch + git merge
 * git pull --rebase = git fetch + git rebase
 * 
 * git merge和git rebase的区别：
 * 假设有3次提交A,B,C。
 * 
 * 在远程分支origin的基础上创建一个名为"mywork"的分支并提交了，同时有其他人在"origin"上做了一些修改并提交了。
 * 这个时候mywork是不能够提交的，因为提交后会发生冲突。
 * 
 * git merge: 用git pull命令把"origin"分支上的修改pull下来与本地提交合并（merge）成版本M
 *                                      A - B - C - D
 *                                              E - M
 * 
 * git rebase: 创建一个新的提交R，R的文件内容和上面M版本一样，但我们将E提交废除，当它不存在
 *                                      A - B - C - D
 *                                              E - R
 */

/** 
 * https://www.jianshu.com/p/a5c4d2f99807
 * 
 * 从远程拉去代码到本地(如果本地分支没有被创建)
 *  git fetch origin dev:远程仓库名称
 *  git checkout 远程仓库名称
 * 
 * git fetch:
 *      具体细节分2步走：
 *      a. 创建并更新本 地远程分支。即创建并更新origin/xxx 分支，拉取代码到origin/xxx分支上。
 *      b. 在FETCH_HEAD中设定当前分支-origin/当前分支对应，如直接到时候git merge就可以将origin/abc合并到abc分支上。
 * 
 * (1) git fetch origin branch1
 *      设定当前分支的 FETCH_HEAD' 为远程服务器的branch1分支`
 *      在这种情况下, 不会在本地创建本地远程分支, 这是因为:这个操作是git pull origin branch1的第一步, 而对应的pull操作,并不会在本地创建新的branch.
 * 
 * (2) git fetch origin branch1:branch2
 *      首先执行上面的fetch操作
 *      使用远程branch1分支在本地创建branch2(但不会切换到该分支),
 *      如果本地不存在branch2分支, 则会自动创建一个新的branch2分支,
 *      如果本地存在branch2分支, 并且是`fast forward', 则自动合并两个分支, 否则, 会阻止以上操作.
 * 
 * (3) git fetch origin :branch2
 *      等价于: git fetch origin master:branch2
 */

