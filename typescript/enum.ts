/** 
 * 枚举
 * 枚举是组织收集有关联变量的一种方式
 */
// 这些枚举类型的值都是数字类型，因此它们被称为数字类型枚举
enum CardSuit {
    Clubs,
    Diamonds,
    Hearts,
    Spades
}

console.log(CardSuit[0]);               // Clubs
console.log(CardSuit.Clubs);            // 0
console.log(CardSuit[CardSuit.Clubs]);  // Clubs

/** 
 * 改变与数字枚举关联的数字
 */
// 默认情况下，第一个枚举值是 0，然后每个后续值依次递增 1：
enum Color {
    Red,    // 0
    Pink,   // 1
    White   // 2
}

// 但是，你可以通过特定的赋值来改变给任何枚举成员关联的数字，我们从3开始依次递增。
enum Color {
    DarkRed = 3, // 3
    DarkGreen, // 4
    DarkBlue // 5
}

console.log(`enum Color`, Color.DarkGreen);

/** 
 * 字符串枚举
 */
enum EvidenceTypeEnum {
    UNKNOWN = '',
    PASSPORT_VISA = 'passport_visa',
    PASSPORT = 'passport',
    SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
    SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
    SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card'
}

const value = 'passport_visa' as EvidenceTypeEnum;

if (value === EvidenceTypeEnum.PASSPORT_VISA) {
    console.log(`字符串枚举匹配成功`);
}

/**
 * 有静态方法的枚举
 * 使用 enum + namespace 的声明的方式向枚举类型添加静态方法
 */
enum Weekday {
    Monday,
    Tuseday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

namespace Weekday {
    export function isBusinessDay(day: Weekday) {
        switch(day) {
            case Weekday.Saturday:
            case Weekday.Sunday:
                return false;
            default:
                return true;
        }
    }
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;

console.log(Weekday.isBusinessDay(mon));
console.log(Weekday.isBusinessDay(sun));