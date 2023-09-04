import React, { Component } from 'react';
import './navigation.css';

let activeCategory = 0;
let music = false;
let matrixNavigation = null;

const toHighlight = [[9,12,17,18,22,34,47,64],[13,26,28,29,33,52,66,70,71],[33,37,38,43,44,48,49,51,54,62,69],[12,13,22,26,27,28,29,35,71]];

const locationLat = [
  null, null, 48.093801, null, null,
  null, null, 48.094523, 48.093969, null,
  null, 48.107734, 48.102450, 48.097751, null,
  null, 48.136113, 48.136113, null, null,
  null, 48.135618, 48.134045, null, null,
  48.133760, 48.134358, 48.136586, 48.136929, null,
  null, null, 48.141532, 48.141907, 48.143161,
  null, 48.143850, 48.144397, 48.142289, null,
  null, null, 48.145405, 48.146161, null,
  null, 48.150013, 48.151375, 48.152720, null,
  48.158561, 48.157362, null, 48.148841, null,
  null, 48.159203, 48.159203, 48.159203, null,
  null, 48.159959, 48.160330, 48.160187, null,
  48.178587, null, null, 48.166760, 48.166361,
  48.187033, null, null, null, null,
];
// const locationLng = [
//   null, null, 17.109355, null, null,
//   null, null, 17.109346, 17.109271, null,
//   null, 17.119957, 17.108921, 17.110219, null,
//   null, 17.120805, 17.120805, null, null,
//   null, 17.130201, 17.113912, null, null,
//   17.138520, 17.128285, 17.122677, 17.104718, null,
//   null, null, 17.112417, 17.103040, 17.078974,
//   null, 17.121171, 17.118235, 17.102886, null,
//   null, null, 17.115236, 17.114630, null,
//   null, 17.126111, 17.121254, 17.112588, null,
//   17.125884, 17.125438, null, 17.070983, null,
//   null, 17.117899, 17.117899, 17.117899, null,
//   null, 17.103504, 17.101578, 17.088770, null,
//   17.185456, null, null, 17.086064, 17.083742,
//   17.189900, null, null, null, null,
// ];

let line1 = [ //zobrazuje sa to naopak (posledna je prva)
  null, null, 'entrance to the tunnel', null, null,
  null, null, 'every thing has a meaning', 'colorful jungle', null,
  null, 'welcoming tree', 'the voice of water', 'circular concrete bench', null,
  null, 'tree family', 'another example', null, null,
  null, 'tree trunk on rocks', 'gothic tower', null, null,
  'trains, trucks, busses, cars,', 'on a bike', 'a new pedestrian bridge', 'metal construction,', null,
  null, null, 'electrical distribution box', 'which of the leaves', 'danube on one side',
  null, 'old city walls', 'missing bricks', 'a bench in the castle grounds', null,
  null, null, 'flowers on concrete', 'home of green leaves', null,
  null, 'thirteen yellow stripes', 'an old entrance', 'yellow trash bin', null,
  'concrete seat near instropolis building', 'red stairs, red tubes', null, 'very bratislava style', null,
  null, 'a fragment of the space', 'a fragment of the space', 'a fragment of the space,', null,
  null, 'a road construction board', 'street art bunker', 'a crossroad in the mountain park', null,
  'wavy rotten fence', null, null, 'good homeless people warn me', 'unknown rusty object',
  'a waterbike on a shore', null, null, null, null,
];

let line2 = [ //zobrazuje sa to naopak (posledna je prva)
  null, null, 'of the unfinished metro', null, null,
  null, null, 'in this place', 'under city highway', null,
  null, 'ideal for climbing and resting', 'flowing through petrzalka', 'where nature rests', null,
  null, 'in the riverside forest', 'of tree love', null, null,
  null, 'fed by danube', 'in the city park', null, null,
  'cyclists, runners, pedestrians, dogs', 'around wavy bridge pillar', 'may replace this place', 'under and above at the same time', null,
  null, null, 'of a modernist residential building', 'actually belong to this tree', 'people on the other',
  null, 'finding new identity', 'in a brick post', 'isolated from the chaos', null,
  null, null, 'behind prior shopping center', 'and yellow plastic bags', null,
  null, 'on nature-loving tires', 'on the moscow street', 'on the sunny square of freedom', null,
  'is perfect fast food eating place', 'glass panels, yellow sign', null, 'tiled corner of university', null,
  null, 'mirroring waves', 'shooting flowes', 'children climb on the waves', null,
  null, 'from the 70s', 'under calvary crosses', 'guarded by this veteran', null,
  'hiding other worlds', null, null, 'to watch out for bad homeless people', 'appared not to be abandoned',
  'waiting without any movement', null, null, null, null,
];

// First ordinament is randomly selected here

const randomFirst = () => {
  var randomFirstTry = Math.floor((Math.random() * 75) + 1);

  while (!locationLat[randomFirstTry-1]) {
    randomFirstTry = Math.floor((Math.random() * 75) + 1);
  }

  return randomFirstTry
}

let activeId = randomFirst();

// Categories

const Category = props => {
  let categoryClass = 'category-'+props.name; //navigation.css
  if (props.active) {
    categoryClass = 'category-'+props.name+' category-'+props.name+'-active';
  }

  return (
    <div
      className={categoryClass}
      id={props.key}
      key={props.key}
      name={props.name}
      onClick={props.categorySelect}
    />
  );
}

const buildCategoriesState = () => {
  const categoriesState = {};

  // Calculate details for each circle
  for (let key = 1; key <= 4; key++) {
    const categoryDetails = {
      active: false,
    };

    categoriesState[key] = categoryDetails;
  }

  if (activeCategory !== 0) {
    categoriesState[activeCategory].active = true;
  }

  return categoriesState;
}

// Circle

const FragmentCircle = props => {
  let circleClass = 'circle circle-unknown'; //navigation.css

  if (props.empty) {
    circleClass = 'circle circle-empty';
  } else {
    if (props.discovered) {
      circleClass = 'circle circle-discovered';
    }
    if (props.active) {
      circleClass = 'circle circle-active';
    }
    if (props.highlighted) {
      circleClass += ' circle-highlighted';
    }
  }

  return (
    <div
      className={circleClass}
      id={props.key}
      key={props.key}
      onClick={props.handleClick}
    />
  );
}

const buildMatrixState = (rowCount, rowLength) => {
  const totalCircles = rowCount * rowLength;
  const matrixState = {};

  for (let key = 1; key <= totalCircles; key++) {
    const circleDetails = {
      active: false,
      discovered: false,
      highlighted: false,
      empty: false,
    };

    if (!locationLat[key-1]) {
      circleDetails.empty = true;
    }

    matrixState[key] = circleDetails;
  }
  matrixState[activeId].active = true;

  return matrixState;
}

//
//
// Class
//
//

class Navigation extends Component {
  constructor(props) {
    super(props)
    const initialRowCount = 15;
    const initialRowLength = 5;

    //aby sa pri prepinani medzi music/static modom zachoval stav navigacie
    if (matrixNavigation === null) {
      matrixNavigation = buildMatrixState(initialRowCount, initialRowLength);
    }

    this.state = {
      rowCount: initialRowCount,
      rowLength: initialRowLength,
      categories: buildCategoriesState(),
      matrix: matrixNavigation
    };

    this.props.handleIdChange(activeId);

    this.handleClick = this.handleClick.bind(this);
    this.categorySelect = this.categorySelect.bind(this);
    this.handleMusic = this.handleMusic.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
  }

  // CATEGORIES

  categoryHighlight(matrix, id) {
    for (let key = 0; key < toHighlight[id].length; key++) {
      matrix[toHighlight[id][key]].highlighted = true;
    }
    return matrix;
  }

  stopHighlight(matrix, previous) {
    for (let key = 0; key < toHighlight[previous].length; key++) {
      matrix[toHighlight[previous][key]].highlighted = false;
    }
    return matrix;
  }

  categorySelect(e) {
    const matrix = this.state.matrix;
    const categories = this.state.categories;
    const id = e.target.id;

    if (activeCategory === 0) {
      categories[id].active = true;
      this.categoryHighlight(matrix, id-1);
      activeCategory = id;
    } else {
      if (activeCategory === id) {
        categories[id].active = false;
        this.stopHighlight(matrix, activeCategory-1);
        activeCategory = 0;
      } else {
        categories[activeCategory].active = false;
        categories[id].active = true;
        this.stopHighlight(matrix, activeCategory-1);
        this.categoryHighlight(matrix, id-1);
        activeCategory = id;
      }
    }
    
    this.setState({ categories, matrix });
    matrixNavigation = this.state.matrix;
    // this.props.handleCategoryChange(categories);
    // this.props.handleMatrixChange(matrix);
  }

  categoriesBuilder() {
    var cats = [];

    cats.push(Category({
      key: 1,
      name: 'nature',
      active: this.state.categories[1].active,
      categorySelect: this.categorySelect,
    }));
    cats.push(Category({
      key: 2,
      name: 'industrial',
      active: this.state.categories[2].active,
      categorySelect: this.categorySelect,
    }));
    cats.push(Category({
      key: 3,
      name: 'street',
      active: this.state.categories[3].active,
      categorySelect: this.categorySelect,
    }));
    cats.push(Category({
      key: 4,
      name: 'waterside',
      active: this.state.categories[4].active,
      categorySelect: this.categorySelect,
    }));

    return ( <div> {cats} </div> );
  }

  // NAVIGATION

  handleClick(e) {
    const matrix = this.state.matrix;
    const id = e.target.id;

    matrix[id].active = true;
    matrix[activeId].active = false;
    matrix[activeId].discovered = true;

    this.setState({ matrix });
    activeId = id;
    this.props.handleIdChange(id);
    // this.props.handleMatrixChange(matrix);
    matrixNavigation = this.state.matrix;
  }

  rowBuilder(rowCount, rowLength, rows = []) {
    if (rowCount > 0) {
      const circleKey = rowCount * rowLength;
      rows.push(this.circleBuilder(circleKey, rowCount, rowLength));

      return this.rowBuilder(rowCount - 1, rowLength, rows);
    }
    return rows
  }

  circleBuilder(circleKey, rowCount, rowLength, row = []) {
    if (rowLength > 0) {
      const circle = this.state.matrix[circleKey];

      row.push(FragmentCircle({
        key: circleKey,
        active: circle.active,
        discovered: circle.discovered,
        highlighted: circle.highlighted,
        empty: circle.empty,
        handleClick: this.handleClick,
      }));

      return this.circleBuilder(circleKey - 1, rowCount, rowLength - 1, row);
    }
    return (<div key={'row-' + rowCount}>{row}</div>);
  }

  // MUSIC BUTTON

  handleMusic() {
    var media = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || false; 

    if (media) {
      music = !music;
      this.props.handleMusicChange(music);
    } else {
        // Web Audio API is not supported
        // Alert the user
        alert("Sorry, music mode is not supported by this browser.");
    }
  }

  musicButtonBuilder() {
    let musicClass = 'musicbutton'; //navigation.css
    if (music) {
      musicClass += ' musicbutton-active';
    }

    return (
      <div
        className={musicClass}
        onClick={this.handleInfo}
      />
    );
  }

  // SECONDARY BUTTONS

  handleInfo() {
    this.props.handleInfoChange(true);
  }

  secondaryBuilder() {
    // const mapLink = "https://mapy.cz/zakladni?q=" + locationLat[activeId-1] + "," + locationLng[activeId-1];
    // const mapLink = "https://www.google.com/maps/search/?api=1&query=" + locationLat[activeId-1] + "," + locationLng[activeId-1];
    
    return (
      <div>
        <div className='map'>ORDINAMENT INFO</div>

        <p className={'description'}>{line1[activeId-1]}<br/>{line2[activeId-1]}</p>
        
        {/* <a href={mapLink} rel="noreferrer" target="_blank">
          <div
            className={'secondary-map'}
          />
        </a>

        <div
          className={'secondary-info'}
          onClick={this.handleInfo}
        /> */}
      </div>      
    );
  }

  // RENDER

  render() {
    return (
      <div>
        <div className="navigation">
          <div className='map'>DISCOVER MAP</div>
          {this.rowBuilder(this.state.rowCount, this.state.rowLength)}
        </div>
        <div className="cats">
          {this.categoriesBuilder()}
          {this.musicButtonBuilder()}
        </div>
        <div className='highlight'>HIGHLIGHT CATEGORY</div>
        <div className='musicmode'>ABOUT</div>
        <div className="secondary">
          {this.secondaryBuilder()}
        </div>
      </div>
    )
  }
}

export default Navigation;